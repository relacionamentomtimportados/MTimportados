/* ==========================================================================
   CATEGORY & PRODUCT GRID CONTROLLER (MT IMPORTADOS $20,000 HAUTE COUTURE)
   ========================================================================== */

class CategoryManager {
  constructor() {
    this.currentCategory = 'perfumes-arabes';
    this.products = [];
    this.filteredProducts = [];
    this.selectedBrands = [];
    this.selectedGenders = [];
    this.currentSort = 'relevance';
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindFilterEvents();
    });
  }

  getCategoryProducts(categorySlug) {
    if (!categorySlug || categorySlug === 'mais-vendidos') return this.products;
    return this.products.filter(p => p.categorySlug === categorySlug || p.department === categorySlug);
  }

  renderBrandFilters() {
    const container = document.getElementById('filter-brands-container');
    if (!container) return;

    const brands = [...new Set(this.getCategoryProducts(this.currentCategory).map(p => p.brand).filter(Boolean))].sort();

    if (brands.length === 0) {
      container.innerHTML = '<p style="font-size:0.8rem; color:var(--color-text-muted);">Nenhuma marca disponível nesta categoria.</p>';
      this.bindBrandFilterEvents();
      return;
    }

    container.innerHTML = brands.map(b => `
      <label class="filter-option"><input type="checkbox" name="brand" value="${b}"> ${b}</label>
    `).join('');

    this.bindBrandFilterEvents();
  }

  loadCategory(categorySlug = 'perfumes-arabes') {
    this.currentCategory = categorySlug;
    this.products = window.PRODUCTS_DATA || [];
    this.selectedBrands = [];
    this.selectedGenders = [];
    document.querySelectorAll('input[name="gender"]').forEach(cb => cb.checked = false);

    // Update Breadcrumb & Header Title
    const bCurrent = document.getElementById('breadcrumb-current');
    const cTitle = document.getElementById('category-title');
    const cDesc = document.getElementById('category-desc');

    const catName = this.formatCategoryName(categorySlug);
    if (bCurrent) bCurrent.textContent = catName;
    if (cTitle) cTitle.textContent = catName;
    if (cDesc) cDesc.textContent = this.getCategoryDescription(categorySlug);

    this.renderBrandFilters();
    this.applyFilters();
  }

  formatCategoryName(slug) {
    const map = {
      'perfumes-arabes': 'Perfumes Árabes de Luxo',
      'perfumes-importados': 'Perfumes Importados Originais',
      'emagrecedores': 'Emagrecedores',
      'exclusivos': 'Produtos Exclusivos',
      'mais-vendidos': 'Mais Vendidos da Semana'
    };
    return map[slug] || slug.replace(/-/g, ' ').toUpperCase();
  }

  getCategoryDescription(slug) {
    const map = {
      'perfumes-arabes': 'Descubra a intensidade e sofisticação das essências orientais. Frascos suntuosos e notas marcantes de OUD, âmbar e especiarias.',
      'perfumes-importados': 'Seleção especial dos perfumes mais desejados do mundo. Fragrâncias 100% originais.',
      'emagrecedores': 'Alta performance para o seu bem-estar. Produtos originais e com eficácia comprovada.',
      'exclusivos': 'Itens de colecionador e edições limitadas com exclusividade.'
    };
    return map[slug] || 'Confira nossos produtos originais exclusivos.';
  }

  bindBrandFilterEvents() {
    // Brand checkboxes are regenerated on every category change, so it's safe
    // to (re)bind fresh listeners here without accumulating duplicates.
    document.querySelectorAll('input[name="brand"]').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(c => c.value);
        this.applyFilters();
      });
    });
  }

  bindFilterEvents() {
    // Gender Checkboxes
    document.querySelectorAll('input[name="gender"]').forEach(cb => {
      cb.addEventListener('change', () => {
        this.selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(c => c.value);
        this.applyFilters();
      });
    });

    // Clear Filters Button
    const btnClear = document.getElementById('btn-clear-filters');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(c => c.checked = false);
        this.selectedBrands = [];
        this.selectedGenders = [];
        this.applyFilters();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    let result = [...this.products];

    // Filter by Category Slug if not 'mais-vendidos'
    if (this.currentCategory && this.currentCategory !== 'mais-vendidos') {
      result = result.filter(p => p.categorySlug === this.currentCategory || p.department === this.currentCategory);
    }

    // Filter by Selected Brands
    if (this.selectedBrands.length > 0) {
      result = result.filter(p => this.selectedBrands.includes(p.brand));
    }

    // Filter by Selected Gender
    if (this.selectedGenders.length > 0) {
      result = result.filter(p => this.selectedGenders.includes(p.gender));
    }

    // Sort Results
    if (this.currentSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'rating') {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    this.filteredProducts = result;
    this.renderProductsGrid();
  }

  renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    const countEl = document.getElementById('category-count');
    const badgeEl = document.getElementById('active-filters-badge');

    const totalActiveFilters = this.selectedBrands.length + this.selectedGenders.length;
    if (badgeEl) badgeEl.textContent = totalActiveFilters;
    if (countEl) countEl.textContent = `(${this.filteredProducts.length} produtos encontrados)`;

    if (!grid) return;

    if (this.filteredProducts.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px;">
          <h3 style="font-family:var(--font-serif); font-size:1.6rem; color:#0a0a0d; margin-bottom:8px;">Nenhum Produto Encontrado</h3>
          <p style="color:var(--color-text-muted); font-size:0.88rem;">Ajuste os filtros selecionados para consultar mais opções do catálogo.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredProducts.map(p => this.createProductCardHTML(p)).join('');
  }

  createProductCardHTML(p) {
    const pixVal = p.pixPrice || (p.price * 0.95);
    const installmentVal = (p.price / 8).toFixed(2).replace('.', ',');

    return `
      <div class="product-card">
        ${p.badge ? `<div class="product-card-badge">${p.badge}</div>` : ''}
        <div class="product-image-container" onclick="window.navigateTo('product', {id: '${p.id}'})" style="cursor:pointer;">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="product-info-container">
          <div class="product-brand">${p.brand || 'MT Importados'}</div>
          <div class="product-title" onclick="window.navigateTo('product', {id: '${p.id}'})" style="cursor:pointer;">${p.title}</div>
          
          <div class="product-stars">
            5.0 <span style="font-size:0.75rem; color:var(--color-text-muted); font-weight:500;">(${p.reviewsCount || 18} avaliações)</span>
          </div>

          <div class="product-price-block">
            <div class="price-old">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
            <div class="price-pix">R$ ${pixVal.toFixed(2).replace('.', ',')}</div>
            <div class="price-pix-label">-${p.pixDiscount || 8}% NO PIX</div>
            <div class="price-installments">ou ${p.installments || 8}x de R$ ${installmentVal} sem juros</div>
          </div>

          <button class="btn-buy-card" onclick="window.cartManager.addItem({id: '${p.id}', name: '${p.title.replace(/'/g, "\\'")}', price: ${p.price}, pixPrice: ${pixVal}, pixDiscountPercent: ${p.pixDiscount || 8}, image: '${p.image}'}, 1, 'Padrão')">
            COMPRAR VIA WHATSAPP
          </button>
        </div>
      </div>
    `;
  }
}

window.categoryManager = new CategoryManager();
