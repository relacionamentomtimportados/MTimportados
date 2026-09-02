-- MT Importados — Pedidos, itens de pedido e log de integrações (Mercado Pago + Bling)
-- Rode este script no SQL Editor do Supabase.

create extension if not exists pgcrypto;

-- ==========================================================================
-- PEDIDOS
-- ==========================================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,

  status text not null default 'pending',            -- pending | paid | cancelled | failed
  payment_status text not null default 'pending',     -- pending | approved | rejected | in_process
  payment_provider text default 'mercadopago',
  mercadopago_preference_id text,
  mercadopago_payment_id text,

  bling_order_id text,
  bling_invoice_id text,
  bling_sync_status text default 'not_configured',    -- not_configured | pending | synced | failed
  bling_last_error text,

  subtotal numeric not null default 0,
  total numeric not null default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  sku text,
  title text not null,
  variant text,
  quantity integer not null,
  unit_price numeric not null,
  total numeric not null
);

-- ==========================================================================
-- LOG DE INTEGRAÇÕES (Mercado Pago webhooks + sincronização com a Bling)
-- Guarda todo evento recebido/enviado, com tentativas e erro, pra nunca
-- perder rastro de um pagamento aprovado ou uma falha de sincronização.
-- ==========================================================================
create table if not exists public.integration_events (
  id bigint generated always as identity primary key,
  provider text not null,           -- mercadopago | bling
  event_type text not null,         -- webhook.received | preference.created | bling.sync.pending | bling.sync.failed ...
  external_id text,
  order_id uuid references public.orders(id) on delete set null,
  status text not null default 'received',  -- received | processed | failed
  payload jsonb,
  attempts integer not null default 0,
  last_error text,
  created_at timestamptz default now(),
  processed_at timestamptz
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_integration_events_order_id on public.integration_events(order_id);
create index if not exists idx_orders_mp_payment_id on public.orders(mercadopago_payment_id);

-- ==========================================================================
-- SEGURANÇA (RLS)
-- Nenhuma política pública é criada de propósito: pedidos têm dados pessoais
-- de cliente (nome, e-mail, telefone) e não podem ser listados/lidos por
-- qualquer visitante do site usando a chave pública. Só as funções
-- serverless (que usam a service_role key, nunca exposta no navegador)
-- conseguem ler/escrever aqui — a service_role ignora RLS por definição.
-- A página de "pedido confirmado" no site consulta o status através de uma
-- função serverless própria (/api/order-status), não direto no Supabase.
-- ==========================================================================
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.integration_events enable row level security;
