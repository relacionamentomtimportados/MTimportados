-- MT Importados — Corrige a política de upload de imagens/vídeos
-- Rode isso no SQL Editor do Supabase. Remove as políticas antigas do bucket
-- product-images e recria de um jeito mais compatível (checando auth.uid()
-- em vez de depender só do papel "authenticated").

drop policy if exists "Public read product images" on storage.objects;
drop policy if exists "Authenticated upload product images" on storage.objects;
drop policy if exists "Authenticated update product images" on storage.objects;
drop policy if exists "Authenticated delete product images" on storage.objects;

create policy "Public read product images" on storage.objects
  for select
  using (bucket_id = 'product-images');

create policy "Authenticated upload product images" on storage.objects
  for insert
  with check (bucket_id = 'product-images' and auth.uid() is not null);

create policy "Authenticated update product images" on storage.objects
  for update
  using (bucket_id = 'product-images' and auth.uid() is not null);

create policy "Authenticated delete product images" on storage.objects
  for delete
  using (bucket_id = 'product-images' and auth.uid() is not null);
