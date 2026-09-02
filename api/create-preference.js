// api/create-preference.js
//
// POST { items: [{ product_id, variant, quantity }], customer: { name, email, phone } }
//
// Creates a pending order + order_items in Supabase, then asks Mercado Pago
// for a Checkout Pro payment link (preference) and returns it so the
// browser can redirect the customer there.
//
// SECURITY NOTE: prices are NEVER trusted from the browser. Every item's
// real price is re-fetched from the `products` table here on the server,
// so a tampered request body cannot change what gets charged.

const { sbInsert, sbSelect, sbUpdate } = require('./_lib/supabase');

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const SITE_URL = process.env.SITE_URL; // e.g. https://mtimportados.vercel.app (no trailing slash)

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (!MP_ACCESS_TOKEN) {
      throw new Error('MP_ACCESS_TOKEN não configurado nas variáveis de ambiente da Vercel.');
    }
    if (!SITE_URL) {
      throw new Error('SITE_URL não configurado nas variáveis de ambiente da Vercel.');
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { items, customer } = body || {};

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Carrinho vazio.' });
      return;
    }
    if (!customer || !customer.name || !customer.email || !customer.phone) {
      res.status(400).json({ error: 'Dados do cliente incompletos (nome, e-mail e telefone são obrigatórios).' });
      return;
    }

    // Re-fetch each product's real price server-side — never trust the
    // client for anything that affects how much gets charged.
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const products = await sbSelect('products', 'id', item.product_id, '*');
      const product = products && products[0];
      if (!product) {
        res.status(400).json({ error: `Produto não encontrado: ${item.product_id}` });
        return;
      }

      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const discount = product.pixDiscount || 0;
      // PIX price is the store's standard checkout price for this flow.
      const unitPrice = Math.round((product.price * (1 - discount / 100)) * 100) / 100;
      const lineTotal = Math.round(unitPrice * quantity * 100) / 100;

      subtotal += lineTotal;
      orderItems.push({
        product_id: product.id,
        sku: product.sku || null,
        title: product.title,
        variant: item.variant || null,
        quantity,
        unit_price: unitPrice,
        total: lineTotal
      });
    }

    const total = Math.round(subtotal * 100) / 100;

    // 1. Create the order as "pending" — nothing here means it's paid yet.
    const [order] = await sbInsert('orders', [{
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      status: 'pending',
      payment_status: 'pending',
      payment_provider: 'mercadopago',
      subtotal,
      total
    }]);

    await sbInsert('order_items', orderItems.map(oi => ({ ...oi, order_id: order.id })));

    // 2. Ask Mercado Pago for a Checkout Pro payment link.
    const preferenceBody = {
      items: orderItems.map(oi => ({
        title: oi.title,
        quantity: oi.quantity,
        unit_price: oi.unit_price,
        currency_id: 'BRL'
      })),
      payer: {
        name: customer.name,
        email: customer.email
      },
      external_reference: order.id,
      notification_url: `${SITE_URL}/api/webhook-mercadopago`,
      back_urls: {
        success: `${SITE_URL}/#pedido?status=success&order_id=${order.id}`,
        failure: `${SITE_URL}/#pedido?status=failure&order_id=${order.id}`,
        pending: `${SITE_URL}/#pedido?status=pending&order_id=${order.id}`
      },
      auto_return: 'approved'
    };

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferenceBody)
    });

    const mpData = await mpRes.json();

    if (!mpRes.ok) {
      await sbInsert('integration_events', [{
        provider: 'mercadopago',
        event_type: 'preference.create_failed',
        order_id: order.id,
        status: 'failed',
        payload: mpData,
        last_error: mpData.message || 'Erro desconhecido ao criar preferência.'
      }]);
      res.status(502).json({ error: 'Erro ao criar preferência de pagamento no Mercado Pago.' });
      return;
    }

    await sbUpdate('orders', 'id', order.id, { mercadopago_preference_id: mpData.id });
    await sbInsert('integration_events', [{
      provider: 'mercadopago',
      event_type: 'preference.created',
      external_id: mpData.id,
      order_id: order.id,
      status: 'processed',
      payload: { preference_id: mpData.id },
      processed_at: new Date().toISOString()
    }]);

    // MP sandbox/test accounts use `sandbox_init_point`; production uses `init_point`.
    const checkoutUrl = mpData.sandbox_init_point || mpData.init_point;

    res.status(200).json({ order_id: order.id, init_point: checkoutUrl });
  } catch (err) {
    console.error('create-preference error:', err);
    res.status(500).json({ error: err.message || 'Erro interno ao criar o pedido.' });
  }
};
