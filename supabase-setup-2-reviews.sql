-- MT Importados — Avaliações de clientes + campo de vídeo do produto
-- Rode este script inteiro no SQL Editor do Supabase (depois do supabase-setup.sql)

-- 1. Coluna de vídeo no produto (upload feito pelo admin)
alter table public.products add column if not exists video text;

-- 2. Tabela de avaliações
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  product_id text not null,
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

-- Qualquer visitante pode ler e enviar avaliação; só o admin logado pode excluir
create policy "Public read reviews" on public.reviews for select using (true);
create policy "Public submit reviews" on public.reviews for insert with check (true);
create policy "Authenticated delete reviews" on public.reviews for delete to authenticated using (true);
