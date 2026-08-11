/* ==========================================================================
   MT IMPORTADOS - ADMIN PANEL / ERP CONTROLLER (SUPABASE INTEGRATION)
   ========================================================================== */

const CATEGORY_NAMES = {
  'perfumes-arabes': 'Perfumes Árabes',
  'perfumes-importados': 'Perfumes Importados',
  'emagrecedores': 'Emagrecedores',
  'exclusivos': 'Exclusivos'
};

class AdminManager {
  constructor() {
    this.editingProductId = null;
    this.brands = [];
    this.products = [];
    this.reviews = [];
  }

  async init() {
    await this.loadBrands();
    await this.loadProducts();

    this.renderAdminProductsTable();
    this.renderBrandsList();
    this.populateBrandSelect();
    this.setupFormListeners();
    this.setupDepartmentListener();
  }

  // --- BRAND MANAGEMENT ---
  async loadBrands() {
    const { data, error } = await window.supabaseClient.from('brands').select('*');
    if (!error && data) {
      this.brands = data.map(b => b.name);
    }
  }

  async saveBrands() {
    this.renderBrandsList();
    this.populateBrandSelect();
    if (window.categoryManager) {
      window.categoryManager.renderBrandFilters();
    }
  }

  async addBrand() {
    const input = document.getElementById('adm-new-brand-name');
    const brandName = input.value.trim();
    if (brandName && !this.brands.includes(brandName)) {
      this.brands.push(brandName);
      await window.supabaseClient.from('brands').insert([{ name: brandName }]);
      this.saveBrands();
      input.value = '';
    }
  }

  async deleteBrand(brandName) {
    if (confirm(`Tem certeza que deseja excluir a marca "${brandName}"?`)) {
      this.brands = this.brands.filter(b => b !== brandName);
      await window.supabaseClient.from('brands').delete().eq('name', brandName);
      this.saveBrands();
    }
  }

  renderBrandsList() {
    const container = document.getElementById('admin-brands-list');
    if (!container) return;
    container.innerHTML = this.brands.map(b => `
      <div style="background:#f1f5f9; padding:6px 12px; border-radius:16px; font-size:0.85rem; display:flex; align-items:center; gap:8px;">
        <span style="font-weight:600;">${b}</span>
        <button type="button" onclick="window.adminManager.deleteBrand('${b}')" style="background:none; border:none; color:#ef4444; font-weight:bold; cursor:pointer;">&times;</button>
      </div>
    `).join('');
  }

  populateBrandSelect() {
    const select = document.getElementById('adm-p-brand');
    if (!select) return;
    const currentVal = select.value;
    select.innerHTML = `<option value="">-- Selecione uma Marca --</option>` +
      this.brands.map(b => `<option value="${b}">${b}</option>`).join('');
    if (this.brands.includes(currentVal)) {
      select.value = currentVal;
    }
  }

  // --- REVIEWS MANAGEMENT ---
  async openReviewsPanel() {
    await this.loadReviewsAdmin();
    this.renderReviewsAdminList();
    document.getElementById('admin-reviews-container').style.display = 'block';
  }

  async loadReviewsAdmin() {
    const { data, error } = await window.supabaseClient
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      this.reviews = data;
    }
  }

  renderReviewsAdminList() {
    const container = document.getElementById('admin-reviews-list');
    if (!container) return;

    if (this.reviews.length === 0) {
      container.innerHTML = '<p style="color:#64748b; font-size:0.9rem;">Nenhuma avaliação recebida ainda.</p>';
      return;
    }

    container.innerHTML = this.reviews.map(r => {
      const product = this.products.find(p => p.id === r.product_id);
      const productLabel = product ? product.title : `Produto #${r.product_id}`;
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      const date = new Date(r.created_at).toLocaleDateString('pt-BR');
      return `
        <div style="border:1px solid #e2e8f0; border-radius:6px; padding:14px 16px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <div style="font-weight:700; font-size:0.9rem;">${r.author_name} <span style="color:#f59e0b; font-weight:400;">${stars}</span></div>
              <div style="font-size:0.78rem; color:#db2777; font-weight:600;">${productLabel}</div>
              <div style="font-size:0.75rem; color:#94a3b8;">${date}</div>
            </div>
            <button type="button" style="background:#ef4444; color:#fff; padding:4px 10px; border-radius:4px; font-size:0.75rem; font-weight:700; white-space:nowrap;" onclick="window.adminManager.deleteReviewAdmin(${r.id})">Excluir</button>
          </div>
          <p style="font-size:0.85rem; margin-top:8px; color:#334155;">${r.comment || ''}</p>
        </div>
      `;
    }).join('');
  }

  async deleteReviewAdmin(reviewId) {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;
    const { error } = await window.supabaseClient.from('reviews').delete().eq('id', reviewId);
    if (!error) {
      this.reviews = this.reviews.filter(r => r.id !== reviewId);
      this.renderReviewsAdminList();
    } else {
      alert('Erro ao excluir avaliação: ' + error.message);
    }
  }

  // --- PRODUCT MANAGEMENT ---
  async loadProducts() {
    const { data, error } = await window.supabaseClient.from('products').select('*');
    if (!error && data) {
      this.products = data;
    }
  }

  openNewProductModal() {
    this.editingProductId = null;
    document.getElementById('adm-form-title').textContent = 'Cadastrar Novo Produto';
    document.getElementById('admin-product-form').reset();
    document.getElementById('adm-upload-status').textContent = '';
    document.getElementById('adm-video-upload-status').textContent = '';
    this.toggleDynamicSpecs();
    document.getElementById('admin-form-container').style.display = 'block';
  }

  clearImageSelection() {
    const input = document.getElementById('adm-p-images');
    if (input) input.value = '';
    const status = document.getElementById('adm-upload-status');
    if (status) status.textContent = '';
  }

  clearVideoSelection() {
    const input = document.getElementById('adm-p-video');
    if (input) input.value = '';
    const status = document.getElementById('adm-video-upload-status');
    if (status) status.textContent = '';
  }

  editProduct(id) {
    const p = this.products.find(x => x.id === id);
    if (!p) return;
    this.editingProductId = p.id;

    document.getElementById('adm-form-title').textContent = 'Editar Produto - ' + p.sku;
    document.getElementById('adm-p-title').value = p.title;
    document.getElementById('adm-p-sku').value = p.sku;
    document.getElementById('adm-p-brand').value = p.brand;
    document.getElementById('adm-p-department').value = p.categorySlug;
    document.getElementById('adm-p-price').value = p.price;
    document.getElementById('adm-p-pix-discount').value = p.pixDiscount || 8;
    document.getElementById('adm-p-stock-qty').value = p.stockQuantity !== undefined ? p.stockQuantity : 10;
    document.getElementById('adm-p-top5').value = p.top5Rank || 0;
    document.getElementById('adm-p-desc').value = p.description || '';

    // Always start with empty file inputs so a photo/video picked for another
    // product never gets carried over and re-uploaded onto this one.
    this.clearImageSelection();
    this.clearVideoSelection();
    document.getElementById('adm-upload-status').textContent = 'Deixe em branco para manter as fotos atuais.';
    document.getElementById('adm-video-upload-status').textContent = p.video ? 'Deixe em branco para manter o vídeo atual.' : '';

    // Populate detailed specs
    const s = p.specs || {};
    document.getElementById('adm-spec-volume').value = s.volume || '';
    document.getElementById('adm-spec-concentration').value = s.concentration || '';
    document.getElementById('adm-spec-fixation').value = s.fixation || '';
    document.getElementById('adm-spec-family').value = s.family || '';
    document.getElementById('adm-spec-origin').value = s.origin || '';

    // Clear dynamic specs
    ['adm-spec-top', 'adm-spec-heart', 'adm-spec-base',
      'adm-spec-active', 'adm-spec-usage', 'adm-spec-format',
      'adm-spec-material', 'adm-spec-edition', 'adm-spec-sizes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    if (p.specs) {
      if (p.categorySlug === 'perfumes-arabes' || p.categorySlug === 'perfumes-importados') {
        document.getElementById('adm-spec-top').value = p.specs.topNotes || '';
        document.getElementById('adm-spec-heart').value = p.specs.heartNotes || '';
        document.getElementById('adm-spec-base').value = p.specs.baseNotes || '';
      } else if (p.categorySlug === 'emagrecedores') {
        document.getElementById('adm-spec-active').value = p.specs.activeIngredient || '';
        document.getElementById('adm-spec-usage').value = p.specs.usage || '';
        document.getElementById('adm-spec-format').value = p.specs.format || '';
      } else if (p.categorySlug === 'exclusivos') {
        document.getElementById('adm-spec-material').value = p.specs.material || '';
        document.getElementById('adm-spec-sizes').value = (p.variants || []).join(', ');
        document.getElementById('adm-spec-edition').value = p.specs.edition || '';
      }
    }

    this.toggleDynamicSpecs();
    document.getElementById('admin-form-container').style.display = 'block';
  }

  setupDepartmentListener() {
    const select = document.getElementById('adm-p-department');
    if (select) {
      select.addEventListener('change', () => this.toggleDynamicSpecs());
    }
  }

  toggleDynamicSpecs() {
    const dept = document.getElementById('adm-p-department').value;
    document.querySelectorAll('.dynamic-spec-group').forEach(el => el.style.display = 'none');
    if (dept === 'perfumes-arabes' || dept === 'perfumes-importados') {
      const el = document.getElementById('specs-perfumes');
      if (el) el.style.display = 'block';
    } else if (dept === 'emagrecedores') {
      const el = document.getElementById('specs-emagrecedores');
      if (el) el.style.display = 'block';
    } else if (dept === 'exclusivos') {
      const el = document.getElementById('specs-exclusivos');
      if (el) el.style.display = 'block';
    }
  }

  setupFormListeners() {
    const form = document.getElementById('admin-product-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.saveProduct();
      });
    }
  }

  async uploadFile(file, folder) {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await window.supabaseClient.storage.from('product-images').upload(filePath, file);
    if (error) {
      console.error('Error uploading file:', error);
      return { error };
    }

    const { data: { publicUrl } } = window.supabaseClient.storage.from('product-images').getPublicUrl(data.path);
    return { publicUrl };
  }

  async uploadImages(files) {
    const statusDiv = document.getElementById('adm-upload-status');
    if (!files || files.length === 0) return [];

    statusDiv.textContent = `Fazendo upload de ${files.length} foto(s)...`;
    statusDiv.style.color = '#059669';

    const urls = [];
    const errors = [];
    for (const file of files) {
      const result = await this.uploadFile(file, 'produtos');
      if (result.error) {
        errors.push(`${file.name}: ${result.error.message || result.error}`);
        continue;
      }
      urls.push(result.publicUrl);
    }

    if (errors.length > 0) {
      const prefix = urls.length > 0 ? `${urls.length} foto(s) enviada(s), mas ` : '';
      statusDiv.textContent = `${prefix}falha em ${errors.length} foto(s): ${errors.join(' | ')}`;
      statusDiv.style.color = 'red';
    } else if (urls.length > 0) {
      statusDiv.textContent = `${urls.length} foto(s) enviada(s) com sucesso!`;
      statusDiv.style.color = '#059669';
    }
    return urls;
  }

  async uploadVideo(file) {
    const statusDiv = document.getElementById('adm-video-upload-status');
    if (!file) return null;

    statusDiv.textContent = 'Fazendo upload do vídeo...';
    statusDiv.style.color = '#059669';

    const result = await this.uploadFile(file, 'produtos-video');
    if (result.error) {
      statusDiv.textContent = `Erro ao fazer upload do vídeo: ${result.error.message || result.error}`;
      statusDiv.style.color = 'red';
      return null;
    }

    statusDiv.textContent = 'Vídeo enviado com sucesso!';
    statusDiv.style.color = '#059669';
    return result.publicUrl;
  }

  async saveProduct() {
    const title = document.getElementById('adm-p-title').value;
    const sku = document.getElementById('adm-p-sku').value;
    const brand = document.getElementById('adm-p-brand').value;
    const categorySlug = document.getElementById('adm-p-department').value;
    const price = parseFloat(document.getElementById('adm-p-price').value);
    const pixDiscount = parseFloat(document.getElementById('adm-p-pix-discount').value) || 0;
    const stockQuantity = parseInt(document.getElementById('adm-p-stock-qty').value) || 0;
    const top5Rank = parseInt(document.getElementById('adm-p-top5').value) || 0;
    const desc = document.getElementById('adm-p-desc').value;

    const imagesInput = document.getElementById('adm-p-images');
    const videoInput = document.getElementById('adm-p-video');

    const submitBtn = document.getElementById('btn-save-product');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Salvando...';

    const uploadedImageUrls = await this.uploadImages(imagesInput.files);
    const uploadedVideoUrl = await this.uploadVideo(videoInput.files[0]);

    const volume = document.getElementById('adm-spec-volume')?.value || '';
    const concentration = document.getElementById('adm-spec-concentration')?.value || '';
    const fixation = document.getElementById('adm-spec-fixation')?.value || '';
    const family = document.getElementById('adm-spec-family')?.value || '';
    const origin = document.getElementById('adm-spec-origin')?.value || '';

    let specs = {
      volume,
      concentration,
      fixation,
      family,
      origin
    };
    let variants = ['Padrão'];

    if (categorySlug === 'perfumes-arabes' || categorySlug === 'perfumes-importados') {
      specs.specType = 'perfume';
      specs.topNotes = document.getElementById('adm-spec-top')?.value || '';
      specs.heartNotes = document.getElementById('adm-spec-heart')?.value || '';
      specs.baseNotes = document.getElementById('adm-spec-base')?.value || '';
    } else if (categorySlug === 'emagrecedores') {
      specs.specType = 'emagrecedores';
      specs.activeIngredient = document.getElementById('adm-spec-active')?.value || '';
      specs.usage = document.getElementById('adm-spec-usage')?.value || '';
      specs.format = document.getElementById('adm-spec-format')?.value || '';
    } else if (categorySlug === 'exclusivos') {
      specs.specType = 'exclusivos';
      specs.material = document.getElementById('adm-spec-material')?.value || '';
      specs.edition = document.getElementById('adm-spec-edition')?.value || '';
      const sizesStr = document.getElementById('adm-spec-sizes')?.value;
      if (sizesStr) {
        variants = sizesStr.split(',').map(s => s.trim()).filter(s => s);
      }
    }

    const productData = {
      id: this.editingProductId || `prod-${Date.now()}`,
      sku,
      title,
      brand,
      categorySlug,
      categoryName: CATEGORY_NAMES[categorySlug] || categorySlug,
      department: categorySlug,
      price,
      pixDiscount,
      installments: 8,
      rating: 5,
      reviewsCount: 1,
      badge: top5Rank > 0 ? `#${top5Rank} TOP 5` : 'NOVO',
      top5Rank: top5Rank > 0 ? top5Rank : null,
      stockQuantity,
      inStock: stockQuantity > 0,
      description: desc,
      specs,
      variants,
      created_at: new Date().toISOString()
    };

    // Only replace photos/video if new ones were uploaded, or it's a new product
    if (uploadedImageUrls.length > 0) {
      productData.image = uploadedImageUrls[0];
      productData.gallery = uploadedImageUrls;
    } else if (!this.editingProductId) {
      // Fallback placeholder if no photos selected
      productData.image = 'assets/products/placeholder.svg';
      productData.gallery = ['assets/products/placeholder.svg'];
    }

    if (uploadedVideoUrl) {
      productData.video = uploadedVideoUrl;
    }

    if (this.editingProductId) {
      // Update existing
      const existingProduct = this.products.find(p => p.id === this.editingProductId);
      if (uploadedImageUrls.length === 0) {
        productData.image = existingProduct.image;
        productData.gallery = existingProduct.gallery || [existingProduct.image];
      }
      if (!uploadedVideoUrl) {
        productData.video = existingProduct.video || null;
      }

      const { error } = await window.supabaseClient.from('products').update(productData).eq('id', this.editingProductId);
      if (!error) {
        const idx = this.products.findIndex(p => p.id === this.editingProductId);
        this.products[idx] = productData;
      } else {
        alert('Erro ao salvar produto: ' + error.message);
      }
    } else {
      // Create new
      const { error } = await window.supabaseClient.from('products').insert([productData]);
      if (!error) {
        this.products.push(productData);
      } else {
        alert('Erro ao salvar produto: ' + error.message);
      }
    }

    document.getElementById('admin-form-container').style.display = 'none';
    this.renderAdminProductsTable();
    this.clearImageSelection();
    this.clearVideoSelection();

    submitBtn.disabled = false;
    submitBtn.textContent = 'Salvar Alterações';

    if (window.renderHomepageVitrines) window.renderHomepageVitrines();
    if (window.categoryManager) window.categoryManager.renderProductsGrid();

    alert('Produto salvo com sucesso!');
  }

  async deleteProduct(id) {
    if (confirm('Atenção: Tem certeza que deseja DELETAR este produto permanentemente?')) {
      const { error } = await window.supabaseClient.from('products').delete().eq('id', id);
      if (!error) {
        this.products = this.products.filter(p => p.id !== id);
        this.renderAdminProductsTable();
      }
    }
  }

  renderAdminProductsTable() {
    const tbody = document.getElementById('admin-products-table-body');
    if (!tbody) return;

    if (this.products.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Nenhum produto cadastrado.</td></tr>';
      return;
    }

    tbody.innerHTML = this.products.map(p => {
      const img = p.image || (p.gallery && p.gallery[0]) || '';
      return `
      <tr>
        <td>${p.sku}</td>
        <td><img src="${img.startsWith('http') ? img : '../' + img}" alt="Thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
        <td style="font-weight:600;">${p.title}</td>
        <td>${p.brand}</td>
        <td>${p.categoryName || p.categorySlug}</td>
        <td>
          <span style="background:${p.stockQuantity > 0 ? '#dcfce7' : '#fee2e2'}; color:${p.stockQuantity > 0 ? '#166534' : '#991b1b'}; padding:2px 8px; border-radius:12px; font-size:0.8rem; font-weight:600;">
            ${p.stockQuantity} un
          </span>
        </td>
        <td>R$ ${parseFloat(p.price).toFixed(2).replace('.', ',')}</td>
        <td>${p.top5Rank ? `<span style="background:#fef08a; padding:2px 6px; border-radius:4px; font-size:0.8rem; font-weight:bold;">Top ${p.top5Rank}</span>` : '-'}</td>
        <td>
          <div style="display:flex; gap:8px;">
            <button class="btn-primary" style="padding:4px 8px; font-size:0.8rem;" onclick="window.adminManager.editProduct('${p.id}')">Editar</button>
            <button class="btn-primary" style="padding:4px 8px; font-size:0.8rem; background:#ef4444;" onclick="window.adminManager.deleteProduct('${p.id}')">Excluir</button>
          </div>
        </td>
      </tr>
    `;
    }).join('');
  }
}

// Ensure the auth has run first, or initialize from auth.js
// auth.js calls window.adminManager.init() inside showDashboard().
window.adminManager = new AdminManager();
