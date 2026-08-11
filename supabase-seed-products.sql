-- MT Importados — Catálogo inicial real (5 produtos por categoria = 20 produtos)
-- Rode este script no SQL Editor do Supabase.
-- Fotos ficam com o placeholder padrão: depois de rodar, edite cada produto no
-- painel admin (botão "Editar") e faça upload das fotos reais.

-- ==========================================================================
-- PERFUMES ÁRABES
-- ==========================================================================
insert into public.products (id, sku, title, brand, "categorySlug", "categoryName", department, price, "pixDiscount", installments, rating, "reviewsCount", image, gallery, badge, "top5Rank", variants, "inStock", "stockQuantity", description, specs)
values
('prod-ar-001', 'PER-AR-1001', 'Lattafa Khamrah EDP 100ml', 'Lattafa', 'perfumes-arabes', 'Perfumes Árabes', 'perfumes-arabes', 439.90, 8, 8, 5, 34, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 24,
 'Khamrah é um oriental especiado lançado pela Lattafa Perfumes, inspirado na tradição árabe de perfumaria rica e envolvente. Fragrância unissex de altíssima fixação, ideal para climas frios e ocasiões noturnas.',
 '{"specType":"perfume","topNotes":"Canela, Cardamomo, Baunilha","heartNotes":"Tâmaras, Tabaco, Pralinê","baseNotes":"Âmbar, Almíscar, Sândalo"}'::jsonb),

('prod-ar-002', 'PER-AR-1002', 'Lattafa Asad EDP 100ml', 'Lattafa', 'perfumes-arabes', 'Perfumes Árabes', 'perfumes-arabes', 269.90, 8, 8, 5, 41, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 30,
 'Asad (''Leão'' em árabe) é uma fragrância amadeirada e adocicada da Lattafa, com forte inspiração em grandes clássicos ocidentais, porém com a fixação característica da perfumaria árabe. Excelente custo-benefício para uso diário.',
 '{"specType":"perfume","topNotes":"Bergamota Fresca","heartNotes":"Tabaco Adocicado","baseNotes":"Amberwood, Baunilha"}'::jsonb),

('prod-ar-003', 'PER-AR-1003', 'Armaf Club de Nuit Intense Man EDT 105ml', 'Armaf', 'perfumes-arabes', 'Perfumes Árabes', 'perfumes-arabes', 299.90, 8, 8, 5, 58, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["105ml"]'::jsonb, true, 28,
 'Considerado um dos grandes destaques da perfumaria de nicho acessível, o Club de Nuit Intense Man é uma fragrância amadeirada aromática de altíssima performance, com projeção e fixação surpreendentes.',
 '{"specType":"perfume","topNotes":"Limão, Groselha Preta, Maçã, Bergamota","heartNotes":"Bétula, Jasmim, Rosa","baseNotes":"Almíscar, Patchouli, Baunilha, Âmbar"}'::jsonb),

('prod-ar-004', 'PER-AR-1004', 'Maison Alhambra Jean Lowe Immortel EDP 100ml', 'Maison Alhambra', 'perfumes-arabes', 'Perfumes Árabes', 'perfumes-arabes', 469.90, 8, 8, 5, 28, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 20,
 'Jean Lowe Immortel é um oriental amadeirado sofisticado da Maison Alhambra. Combina notas cítricas frescas com uma base quente de âmbar e incenso, resultando em uma fragrância marcante e de longa duração.',
 '{"specType":"perfume","topNotes":"Toranja, Gengibre, Bergamota","heartNotes":"Sálvia, Alecrim, Gerânio","baseNotes":"Âmbar, Lábdano, Bastão de Incenso"}'::jsonb),

('prod-ar-005', 'PER-AR-1005', 'Al Haramain L''Aventure EDP 100ml', 'Al Haramain', 'perfumes-arabes', 'Perfumes Árabes', 'perfumes-arabes', 379.90, 8, 8, 5, 47, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 18,
 'L''Aventure é uma fragrância amadeirada aromática vibrante da Al Haramain, conhecida pela abertura frutada intensa e trilha almiscarada duradoura. Perfeita para quem busca destaque em qualquer ambiente.',
 '{"specType":"perfume","topNotes":"Maçã, Groselha Preta, Coentro","heartNotes":"Bétula, Patchouli, Gerânio","baseNotes":"Almíscar, Âmbar, Musgo de Carvalho"}'::jsonb)
on conflict (id) do nothing;

-- ==========================================================================
-- PERFUMES IMPORTADOS
-- ==========================================================================
insert into public.products (id, sku, title, brand, "categorySlug", "categoryName", department, price, "pixDiscount", installments, rating, "reviewsCount", image, gallery, badge, "top5Rank", variants, "inStock", "stockQuantity", description, specs)
values
('prod-imp-001', 'PER-IMP-2001', 'Dior Sauvage EDT 100ml', 'Dior', 'perfumes-importados', 'Perfumes Importados', 'perfumes-importados', 1449.90, 8, 8, 5, 62, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 15,
 'Sauvage é um dos perfumes masculinos mais vendidos do mundo. Fragrância fresca e amadeirada-aromática que evoca paisagens selvagens e abertas, com a icônica bergamota da Calábria e a mineralidade do Ambroxan.',
 '{"specType":"perfume","topNotes":"Bergamota da Calábria, Pimenta","heartNotes":"Pimenta de Sichuan, Lavanda, Anis Estrelado, Noz-moscada","baseNotes":"Ambroxan, Cedro, Lábdano"}'::jsonb),

('prod-imp-002', 'PER-IMP-2002', 'Bleu de Chanel EDP 100ml', 'Chanel', 'perfumes-importados', 'Perfumes Importados', 'perfumes-importados', 999.90, 8, 8, 5, 39, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 12,
 'Bleu de Chanel é um amadeirado aromático que representa a liberdade masculina moderna. Versátil e sofisticado, transita perfeitamente do ambiente corporativo aos eventos noturnos.',
 '{"specType":"perfume","topNotes":"Toranja, Limão, Hortelã, Pimenta Rosa","heartNotes":"Gengibre, Noz-moscada, Jasmim","baseNotes":"Incenso, Vetiver, Cedro, Sândalo, Almíscar Branco"}'::jsonb),

('prod-imp-003', 'PER-IMP-2003', 'Versace Eros EDT 100ml', 'Versace', 'perfumes-importados', 'Perfumes Importados', 'perfumes-importados', 799.90, 8, 8, 5, 71, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 20,
 'Eros é uma fragrância intensa e sedutora inspirada no deus grego do amor. A combinação de hortelã fresca com baunilha quente e ambroxan cria um contraste marcante e viciante.',
 '{"specType":"perfume","topNotes":"Hortelã, Maçã Verde, Limão","heartNotes":"Fava Tonka, Ambroxan, Gerânio","baseNotes":"Baunilha, Vetiver, Musgo de Carvalho, Cedro"}'::jsonb),

('prod-imp-004', 'PER-IMP-2004', 'Paco Rabanne 1 Million EDT 100ml', 'Paco Rabanne', 'perfumes-importados', 'Perfumes Importados', 'perfumes-importados', 899.90, 8, 8, 5, 55, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 22,
 '1 Million é sinônimo de ousadia e luxo. Fragrância oriental especiada com abertura frutada intensa e uma base de couro e âmbar que remete diretamente à opulência.',
 '{"specType":"perfume","topNotes":"Tangerina Sanguínea, Hortelã, Toranja","heartNotes":"Canela, Notas Especiadas, Rosa","baseNotes":"Couro, Âmbar, Patchouli, Madeira Branca"}'::jsonb),

('prod-imp-005', 'PER-IMP-2005', 'Giorgio Armani Acqua di Giò EDT 100ml', 'Giorgio Armani', 'perfumes-importados', 'Perfumes Importados', 'perfumes-importados', 949.90, 8, 8, 5, 44, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["100ml"]'::jsonb, true, 18,
 'Acqua di Giò é o perfume aquático masculino mais icônico já criado. Fresco e mediterrâneo, remete diretamente ao mar e à brisa do verão italiano.',
 '{"specType":"perfume","topNotes":"Bergamota, Neroli, Tangerina Verde","heartNotes":"Jasmim, Notas Marinhas, Alecrim, Persimon","baseNotes":"Almíscar Branco, Cedro, Musgo de Carvalho, Patchouli"}'::jsonb)
on conflict (id) do nothing;

-- ==========================================================================
-- EMAGRECEDORES
-- ==========================================================================
insert into public.products (id, sku, title, brand, "categorySlug", "categoryName", department, price, "pixDiscount", installments, rating, "reviewsCount", image, gallery, badge, "top5Rank", variants, "inStock", "stockQuantity", description, specs)
values
('prod-emg-001', 'EMG-3001', 'Caneta Mounjaro 5mg', 'Lilly', 'emagrecedores', 'Emagrecedores', 'emagrecedores', 989.90, 8, 8, 5, 33, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["1 Caneta"]'::jsonb, true, 10,
 'Caneta aplicadora de tirzepatida, indicada para controle de peso e diabetes tipo 2 sob prescrição médica. Aplicação subcutânea semanal, dose de 5mg.',
 '{"specType":"emagrecedores","activeIngredient":"Tirzepatida 5mg","usage":"1 aplicação subcutânea por semana, sempre com acompanhamento médico","format":"Caneta aplicadora pré-preenchida"}'::jsonb),

('prod-emg-002', 'EMG-3002', 'Caneta Ozempic 1mg', 'Novo Nordisk', 'emagrecedores', 'Emagrecedores', 'emagrecedores', 1439.90, 8, 8, 5, 52, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["1 Caneta"]'::jsonb, true, 12,
 'Caneta aplicadora de semaglutida, um dos tratamentos mais procurados para controle glicêmico e redução de peso. Uso semanal, sempre acompanhado de orientação médica.',
 '{"specType":"emagrecedores","activeIngredient":"Semaglutida 1mg","usage":"1 aplicação subcutânea por semana, sempre com acompanhamento médico","format":"Caneta aplicadora pré-preenchida"}'::jsonb),

('prod-emg-003', 'EMG-3003', 'Caneta Wegovy 2.4mg', 'Novo Nordisk', 'emagrecedores', 'Emagrecedores', 'emagrecedores', 1019.90, 8, 8, 5, 29, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["1 Caneta"]'::jsonb, true, 8,
 'Wegovy é a versão de semaglutida desenvolvida especificamente para o tratamento da obesidade, com dose otimizada sob prescrição e acompanhamento médico contínuo.',
 '{"specType":"emagrecedores","activeIngredient":"Semaglutida 2.4mg","usage":"1 aplicação subcutânea por semana, dose de manutenção","format":"Caneta aplicadora pré-preenchida"}'::jsonb),

('prod-emg-004', 'EMG-3004', 'Caneta Saxenda 3mg', 'Novo Nordisk', 'emagrecedores', 'Emagrecedores', 'emagrecedores', 2299.90, 8, 8, 5, 21, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["1 Caneta"]'::jsonb, true, 9,
 'Saxenda (liraglutida) é indicada para o controle de peso crônico, com aplicação diária. Tratamento consolidado no mercado, sempre sob prescrição e acompanhamento médico.',
 '{"specType":"emagrecedores","activeIngredient":"Liraglutida 3mg","usage":"1 aplicação subcutânea diária","format":"Caneta aplicadora pré-preenchida"}'::jsonb),

('prod-emg-005', 'EMG-3005', 'Caneta Rybelsus 14mg', 'Novo Nordisk', 'emagrecedores', 'Emagrecedores', 'emagrecedores', 1499.90, 8, 8, 5, 37, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["Caixa com Comprimidos"]'::jsonb, true, 14,
 'Rybelsus é a versão oral da semaglutida, indicada para pacientes que preferem não realizar aplicações injetáveis. Comprimidos de uso diário, sempre sob prescrição médica.',
 '{"specType":"emagrecedores","activeIngredient":"Semaglutida 14mg (via oral)","usage":"1 comprimido via oral por dia, em jejum","format":"Caixa com comprimidos"}'::jsonb)
on conflict (id) do nothing;

-- ==========================================================================
-- EXCLUSIVOS
-- ==========================================================================
insert into public.products (id, sku, title, brand, "categorySlug", "categoryName", department, price, "pixDiscount", installments, rating, "reviewsCount", image, gallery, badge, "top5Rank", variants, "inStock", "stockQuantity", description, specs)
values
('prod-exc-001', 'EXC-4001', 'Tênis Nike Air Jordan 1 Chicago', 'Nike', 'exclusivos', 'Exclusivos', 'exclusivos', 4590.00, 8, 8, 5, 45, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["38","39","40","41","42","43"]'::jsonb, true, 6,
 'O Air Jordan 1 Chicago é o santo graal do universo sneaker, com a icônica combinação branco, vermelho e preto que definiu a cultura do basquete e da moda de rua e segue cobiçada até hoje.',
 '{"specType":"exclusivos","material":"Couro Legítimo Premium","edition":"Edição Retro Limitada"}'::jsonb),

('prod-exc-002', 'EXC-4002', 'Bolsa Louis Vuitton Neverfull MM', 'Louis Vuitton', 'exclusivos', 'Exclusivos', 'exclusivos', 13890.00, 8, 8, 5, 18, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["Único"]'::jsonb, true, 4,
 'A Neverfull MM é uma das bolsas mais icônicas da Louis Vuitton, confeccionada em canvas Monogram e couro natural. Espaçosa, versátil e atemporal, é peça de desejo em qualquer guarda-roupa de luxo.',
 '{"specType":"exclusivos","material":"Canvas Monogram e Couro Natural","edition":"Coleção Clássica"}'::jsonb),

('prod-exc-003', 'EXC-4003', 'Relógio Rolex Submariner Date', 'Rolex', 'exclusivos', 'Exclusivos', 'exclusivos', 58900.00, 8, 8, 5, 9, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["Único"]'::jsonb, true, 2,
 'O Submariner Date é o relógio de mergulho mais reconhecido do mundo, símbolo máximo de status e precisão suíça. Caixa em aço Oystersteel, resistente à água até 300 metros.',
 '{"specType":"exclusivos","material":"Aço Oystersteel e Vidro de Safira","edition":"Coleção Professional"}'::jsonb),

('prod-exc-004', 'EXC-4004', 'Óculos Gucci GG0396S', 'Gucci', 'exclusivos', 'Exclusivos', 'exclusivos', 2190.00, 8, 8, 5, 26, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["Único"]'::jsonb, true, 10,
 'O GG0396S é um óculos de sol statement da Gucci, com armação oversized e o icônico logo duplo GG nas hastes. Proteção UV total com o design ousado que é marca registrada da grife.',
 '{"specType":"exclusivos","material":"Acetato Premium e Lentes com Proteção UV400","edition":"Coleção Eyewear"}'::jsonb),

('prod-exc-005', 'EXC-4005', 'Tênis Yeezy Boost 350 V2', 'Adidas', 'exclusivos', 'Exclusivos', 'exclusivos', 2890.00, 8, 8, 5, 31, 'assets/products/placeholder.svg', '["assets/products/placeholder.svg"]'::jsonb, 'NOVO', NULL, '["37","38","39","40","41","42","43","44"]'::jsonb, true, 8,
 'O Yeezy Boost 350 V2, fruto da parceria entre Kanye West e Adidas, revolucionou o mercado de sneakers com o design minimalista em Primeknit e o exclusivo amortecimento Boost.',
 '{"specType":"exclusivos","material":"Primeknit e Solado Boost","edition":"Edição Limitada"}'::jsonb)
on conflict (id) do nothing;
