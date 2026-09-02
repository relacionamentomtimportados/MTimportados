// api/order-status.js
//
// GET ?id=<order_id> — used only by the "pedido confirmado" page to show
// the real, server-confirmed status of a single order. This exists so the
// storefront never has to query the `orders` table directly (that table has
// no public policies at all, on purpose — see supabase-setup-4-orders.sql).
// A visitor can only ever look up the exact order id they were redirected
// with; there is no way to list or browse other people's orders.

const { sbSelect } = require('./_lib/supabase');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const orderId = req.query && req.query.id;
  if (!orderId) {
    res.status(400).json({ error: 'Parâmetro "id" é obrigatório.' });
    return;
  }

  try {
    const orders = await sbSelect('orders', 'id', orderId, 'id,status,payment_status,total,customer_name,created_at');
    const order = orders && orders[0];

    if (!order) {
      res.status(404).json({ error: 'Pedido não encontrado.' });
      return;
    }

    res.status(200).json({
      id: order.id,
      status: order.status,
      payment_status: order.payment_status,
      total: order.total,
      first_name: (order.customer_name || '').split(' ')[0],
      created_at: order.created_at
    });
  } catch (err) {
    console.error('order-status error:', err);
    res.status(500).json({ error: 'Erro ao consultar o pedido.' });
  }
};
