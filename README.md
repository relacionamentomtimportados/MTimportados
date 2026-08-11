# Recriação 1:1 Completa - E-Commerce Arôme de Capelin

Projeto de clonagem de alta fidelidade visual, estrutural e interativa da loja virtual **Arôme de Capelin** ([www.aromedecapelin.com.br](https://www.aromedecapelin.com.br/)), e-commerce de perfumaria fina importada, perfumes árabes e perfumaria de nicho com sede física em **Gramado - RS**.

---

## 🛠️ Stack Tecnológica & Bibliotecas

- **HTML5 Semântico**: Estruturação completa das 5 páginas principais da jornada de e-commerce.
- **CSS3 (Design System Vanilla CSS)**: 
  - Cores institucionais: `--cor-base: #283d64`, `--cor-base-light: #3e5174`, `--cor-base-darken: #24375a`, `--color-gold: #c5a059`, `--color-green-pix: #16a34a`.
  - Tipografia original: Google Fonts `Montserrat` (Títulos, botões e badges) e `Open Sans` (Corpo e especificações técnicas).
  - Animações, microinterações, transições de hover, zoom na galeria de imagens e layout responsivo com breakpoints (Desktop Wide, Desktop, Tablet, Mobile).
- **JavaScript Modular (ES6)**:
  - `main.js`: Autocomplete de pesquisa em tempo real, header sticky, navegação por menus dropdown e banner de cookies com persistência em `localStorage`.
  - `carousel.js`: Carrossel principal de banners da Homepage com rotação automática, indicadores de bullets e suporte a touch swipe.
  - `filters.js`: Lógica da página de listagem de categoria, badges de filtros ativos, ordenador de produtos e preservação das variações comerciais reais por categoria.
  - `product.js`: Detalhes do produto, galeria interativa com thumbnails e zoom ao passar o mouse, seletores de volumes (100ml), cálculo automático de parcelas, estado de produto indisponível com captura de e-mail e barra inferior fixa de conversão.
  - `cart.js`: Gerenciador do mini-carrinho estilo drawer lateral com incremento/decremento de quantidades, remoção, cálculo de cupons (`CAPELIN10`), frete e destaques do desconto PIX.

---

## 📂 Estrutura de Arquivos

```
MtImports/
├── index.html                   # Homepage completa (Hero carousel, vitrines de destaques, selos comerciais)
├── categoria.html               # Template dinâmico de listagem (Perfumes Árabes, Importados, Chambre 52, Mais Vendidos)
├── produto.html                 # Template de detalhes do produto (Maison Alhambra Immortel, Lattafa Asad, Baccarat Rouge)
├── quem-somos.html              # Página institucional (Texto integral Gramado-RS, fotos reais da loja física)
├── styles/
│   └── main.css                 # Design system completo de CSS, tokens de cor, tipografia e responsividade
├── scripts/
│   ├── main.js                  # Inicialização global, autocomplete e navegação
│   ├── carousel.js              # Controlador de carrossel hero e vitrines
│   ├── filters.js               # Controlador de categorias e filtros
│   ├── product.js               # Controlador da galeria, pirâmide olfativa e ficha técnica
│   └── cart.js                  # Gerenciador do mini-carrinho drawer e cupons
├── assets/
│   ├── logo/                    # Logo oficial e favicon Arôme de Capelin
│   ├── banners/                 # Banners promocionais e de categoria
│   ├── products/                # Imagens de alta definição dos frascos de perfumes
│   └── store/                   # Fotos reais da loja física na Rua Reinaldo Sperb, 63 em Gramado - RS
└── README.md                    # Documentação técnica do projeto
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em HTML5/CSS3/JS puro, basta abrir os arquivos diretamente no navegador ou utilizar um dev server local:

### Método 1: VS Code Live Server (Recomendado)
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito no `index.html` e selecione **Open with Live Server**.

### Método 2: Servidor HTTP Simples com Python ou Node.js
```bash
# Com Python 3
python -m http.server 8000

# Ou com npx serve
npx serve .
```
Acesse `http://localhost:8000` em seu navegador.

---

## 🎯 O Que Foi Clonado com Fidelidade Pixel-Perfect por Página

### 1. Homepage (`index.html`)
- Header sticky com logo oficial, busca com autocomplete funcional ao digitar ("Maison", "Lattafa", etc.), links rápidos para WhatsApp, Minha Conta e Sacola com badge numérico ativo.
- Menu navegável por categorias com dropdowns em hover.
- Carrossel principal de banners com transições suaves e chamadas de ação.
- Faixa de benefícios comerciais (Frete Grátis, Até 8x Sem Juros, Desconto no PIX e Loja Física em Gramado-RS).
- Grid de destaques por categoria e vitrine de produtos com cards completos (selos `-5% NO PIX`, estrelas de avaliação, cálculo de parcelas e botão "Comprar").
- Banner de cookies persistente com aceite via `localStorage`.

### 2. Categoria / Listagem (`categoria.html`)
- Preservação exata das regras comerciais específicas por categoria:
  - **Perfumes Árabes (463 produtos)**: Até 8x sem juros | 5% de desconto no PIX.
  - **Mais Vendidos**: Até 6x sem juros | 8% de desconto no PIX.
  - **Chambre 52 (Nicho VIP)**: Até 8x sem juros | 5% de desconto no PIX.
- Sidebar de filtros completa com contador badge (`Filtros Selecionados 0`), caixas de seleção por marca, gênero, concentração e botão de limpar filtros.
- Ordenação por menor preço, maior preço e mais vendidos.

### 3. Página de Produto (`produto.html`)
- Galeria com suporte a troca de thumbnails e efeito de zoom ao passar o cursor sobre a imagem principal.
- Título oficial, SKU/Modelo, preço cheio cortado, valor PIX em destaque verde com selo de desconto e cálculo exato do valor das parcelas no cartão.
- Seletor funcional de tamanho/volume (ex.: 100ml).
- Suporte a produtos fora de estoque (exite o box "Produto indisponível! Podemos avisar você quando estiver disponível?" com formulário de e-mail/WhatsApp).
- Seção expansível com **Pirâmide Olfativa em 3 níveis** (Notas de topo, coração e fundo) e **Ficha Técnica em tabela** (Fixação, Projeção, Gênero, Sugestão de Uso).
- Barra inferior fixa (*sticky bottom bar*) de reforço para alta conversão.

### 4. Institucional "Quem Somos" (`quem-somos.html`)
- Texto institucional 100% idêntico ao original, ressaltando a presença da loja física em Gramado - RS (*Rua Reinaldo Sperb, 63*).
- Galeria de imagens reais da loja física e fachada.
- Banner de fechamento com a mensagem de confiança: *"VEM COM A ARÔME DE CAPELIN. EM NOSSO TRABALHO VOCÊ PODE CONFIAR!"*.

### 5. Carrinho & Mini-Carrinho Drawer (`scripts/cart.js`)
- Side drawer deslizante a partir da direita ao clicar no ícone de sacola ou adicionar qualquer item.
- Edição dinâmica de quantidade (`+` / `-`), remoção de itens e recálculo instantâneo de totais e desconto no PIX.
- Validação de cupons promocionais (teste digitando `CAPELIN10` para 10% de desconto).
- Estado de sacola vazia com mensagem amigável e botão para continuar comprando.

---

## 🎨 Observações sobre Assets

- Todos os assets (banners, frascos de perfumes em alta definição, logo e fotos da loja de Gramado-RS) foram coletados do CDN público original (`aromedecapelin.cdn.magazord.com.br`) e organizados localmente na pasta `/assets/`.
