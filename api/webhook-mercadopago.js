// api/webhook-mercadopago.js
//
// Mercado Pago calls this URL whenever a payment's status changes. We never
// trust the notification body by itself — we take the payment id it gives
// us and ask Mercado Pago's own API directly (server-to-server, with our
// secret Access Token) what the real, current status is. That's the only
// value that ever marks an order as paid.

const { sbSelect, sbUpdate, sbInsert } = require('./_lib/supabase');

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

module.exports = async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // Mercado Pago sends the payment id either in the JSON body (newer format:
  // { type: 'payment', data: { id } }) or as query params (older IPN format:
  // ?topic=payment&id=...). Handle both.
  const body = typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })() : (req.body || {});
  const query = req.query || {};

  const eventType = body.type || query.topic;
  const paymentId = (body.data && body.data.id) || query.id || query['data.id'];

  // Always log the raw notification first, whatever it turns out to be.
  await sbInsert('integration_events', [{
    provider: 'mercadopago',
    event_type: 'webhook.received',
    external_id: paymentId ? String(paymentId) : null,
    status: 'received',
    payload: { body, query }
  }]).catch(err => console.error('Falha ao logar webhook recebido:', err));

  // We only care about payment events — Mercado Pago also sends other
  // notification types (merchant_order, etc.) we can safely ignore.
  if (eventType !== 'payment' || !paymentId) {
    res.status(200).json({ ignored: true });
    return;
  }

  try {
    if (!MP_ACCESS_TOKEN) {
      throw new Error('MP_ACCESS_TOKEN não configurado.');
    }

    // The single source of truth: ask Mercado Pago directly for this payment.
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` }
    });
    const payment = await mpRes.json();

    if (!mpRes.ok) {
      throw new Error(payment.message || `Falha ao consultar pagamento ${paymentId} no Mercado Pago.`);
    }

    const orderId = payment.external_reference;
    if (!orderId) {
      await sbInsert('integration_events', [{
        provider: 'mercadopago',
        event_type: 'webhook.no_order_reference',
        external_id: String(paymentId),
        status: 'failed',
        payload: payment,
        last_error: 'Pagamento sem external_reference — não foi possível associar a um pedido.'
      }]);
      res.status(200).json({ warning: 'no external_reference' });
      return;
    }

    const orders = await sbSelect('orders', 'id', orderId, '*');
    const order = orders && orders[0];
    if (!order) {
      await sbInsert('integration_events', [{
        provider: 'mercadopago',
        event_type: 'webhook.order_not_found',
        external_id: String(paymentId),
        status: 'failed',
        payload: payment,
        last_error: `Pedido ${orderId} não encontrado no Supabase.`
      }]);
      res.status(200).json({ warning: 'order not found' });
      return;
    }

    // Mercado Pago payment.status: approved | pending | in_process | rejected | cancelled | refunded | charged_back
    const isApproved = payment.status === 'approved';
    const newStatus = isApproved ? 'paid' : (payment.status === 'rejected' || payment.status === 'cancelled' ? 'failed' : 'pending');

    await sbUpdate('orders', 'id', order.id, {
      payment_status: payment.status,
      mercadopago_payment_id: String(payment.id),
      status: newStatus,
      // Mark it ready for the Bling handoff. Actually sending it to Bling
      // happens in api/bling-sync.js, which is a separate step — this repo
      // does not yet have Bling credentials configured, so it stays queued
      // here (bling_sync_status stays visible in the orders table) until
      // that integration is switched on.
      bling_sync_status: isApproved ? 'pending' : order.bling_sync_status,
      updated_at: new Date().toISOString()
    });

    await sbInsert('integration_events', [{
      provider: 'mercadopago',
      event_type: `payment.${payment.status}`,
      external_id: String(payment.id),
      order_id: order.id,
      status: 'processed',
      payload: { status: payment.status, status_detail: payment.status_detail },
      processed_at: new Date().toISOString()
    }]);

    if (isApproved) {
      await sbInsert('integration_events', [{
        provider: 'bling',
        event_type: 'bling.sync.queued',
        order_id: order.id,
        status: 'received',
        payload: { reason: 'payment approved, waiting for Bling credentials/integration to go live' }
      }]);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('webhook-mercadopago error:', err);
    await sbInsert('integration_events', [{
      provider: 'mercadopago',
      event_type: 'webhook.processing_error',
      external_id: paymentId ? String(paymentId) : null,
      status: 'failed',
      last_error: err.message
    }]).catch(() => {});
    // Still respond 200 so Mercado Pago doesn't hammer us with retries for
    // an error that a retry won't fix (e.g. misconfiguration); the event is
    // logged above for us to investigate.
    res.status(200).json({ error: err.message });
  }
};
