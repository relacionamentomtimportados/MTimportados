// api/bling-sync.js
//
// STATUS: SCAFFOLD — não está ligado ainda. Falta a credencial OAuth 2.0 da
// Bling (client_id + client_secret de um aplicativo criado no painel dela,
// mais o token gerado depois que a Thalita autorizar o acesso). Sem isso,
// esta função só confirma quais pedidos estão esperando pra ser enviados —
// nenhum pedido aprovado fica "perdido": eles ficam com
// orders.bling_sync_status = 'pending' até serem processados aqui de verdade.
//
// Quando tivermos a credencial, o trabalho real vira:
//   1. getBlingAccessToken()  → trocar/renovar o token OAuth da Bling
//   2. createBlingOrder(order, items) → POST no endpoint de pedido de venda
//      da API da Bling (bling.com.br/Api/v3/pedidos/vendas, a confirmar na
//      documentação oficial no momento da implementação)
//   3. Guardar o bling_order_id retornado e marcar bling_sync_status='synced'
//   4. Em caso de falha, marcar 'failed' + bling_last_error e permitir retry
//
// Este endpoint pode ser chamado manualmente (POST) ou, futuramente, por uma
// Vercel Cron Job rodando a cada poucos minutos, pra pegar qualquer pedido
// que ficou pendente.

const { sbSelect, sbUpdate, sbInsert } = require('./_lib/supabase');

const BLING_CLIENT_ID = process.env.BLING_CLIENT_ID;
const BLING_CLIENT_SECRET = process.env.BLING_CLIENT_SECRET;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const pendingOrders = await sbSelect('orders', 'bling_sync_status', 'pending', '*');

    if (!pendingOrders || pendingOrders.length === 0) {
      res.status(200).json({ message: 'Nenhum pedido pendente de sincronização com a Bling.' });
      return;
    }

    if (!BLING_CLIENT_ID || !BLING_CLIENT_SECRET) {
      // Not configured yet — leave every pending order exactly as it is
      // (still visible, still queued) and just record that we checked.
      await sbInsert('integration_events', [{
        provider: 'bling',
        event_type: 'bling.sync.skipped_no_credentials',
        status: 'received',
        payload: { pending_order_ids: pendingOrders.map(o => o.id) }
      }]);

      res.status(200).json({
        configured: false,
        message: `Bling ainda não configurada. ${pendingOrders.length} pedido(s) aguardando: adicione BLING_CLIENT_ID e BLING_CLIENT_SECRET nas variáveis de ambiente da Vercel para ativar o envio automático.`,
        pending_order_ids: pendingOrders.map(o => o.id)
      });
      return;
    }

    // A partir daqui é onde a integração real entra, uma vez configurada.
    const results = [];
    for (const order of pendingOrders) {
      try {
        // const token = await getBlingAccessToken();
        // const items = await sbSelect('order_items', 'order_id', order.id, '*');
        // const blingOrder = await createBlingOrder(token, order, items);
        // await sbUpdate('orders', 'id', order.id, {
        //   bling_order_id: blingOrder.id,
        //   bling_sync_status: 'synced'
        // });
        throw new Error('Integração com a Bling ainda não implementada — só o scaffold existe.');
      } catch (err) {
        await sbUpdate('orders', 'id', order.id, {
          bling_sync_status: 'failed',
          bling_last_error: err.message
        });
        await sbInsert('integration_events', [{
          provider: 'bling',
          event_type: 'bling.sync.failed',
          order_id: order.id,
          status: 'failed',
          last_error: err.message
        }]);
        results.push({ order_id: order.id, ok: false, error: err.message });
      }
    }

    res.status(200).json({ configured: true, results });
  } catch (err) {
    console.error('bling-sync error:', err);
    res.status(500).json({ error: err.message });
  }
};
