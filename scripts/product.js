/* ==========================================================================
   PRODUCT DETAIL CONTROLLER (MT IMPORTADOS MULTI-NICHO)
   ========================================================================== */

class ProductManager {
  constructor() {
    this.currentProduct = null;
    this.selectedVariant = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindTabEvents();
    });
  }

  loadProduct(productId) {
    const products = window.PRODUCTS_DATA || [];
    this.currentProduct = products.find(p => p.id === productId) || products[0];

    if (!this.currentProduct) return;

    this.renderProductDetails();
    this.updateStickyBar();
    this.loadReviews(this.currentProduct.id);
    this.bindReviewForm(this.currentProduct.id);
    this.renderRelatedProducts();
  }

  renderRelatedProducts() {
    if (!this.currentProduct || !window.PRODUCTS_DATA) return;
    const cat = this.currentProduct.categorySlug || this.currentProduct.category;
    
    // Filter by same category, exclude current product
    let related = window.PRODUCTS_DATA.filter(p => 
      (p.categorySlug === cat || p.category === cat) && p.id !== this.currentProduct.id
    );
    
    // Shuffle the related array for variety
    for (let i = related.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [related[i], related[j]] = [related[j], related[i]];
    }

    const grid = document.getElementById('related-products-grid');
    if (grid && typeof window.createProductCardHTML === 'function') {
      grid.innerHTML = related.length > 0 
        ? related.map(p => window.createProductCardHTML(p, false)).join('') 
        : '<div style="grid-column:1/-1; text-align:center;">Nenhum produto relacionado encontrado.</div>';
      
      if (related.length > 0 && typeof window.setupInfiniteCarousel === 'function') {
        window.setupInfiniteCarousel('related-products-grid');
      }
    }
  }

  renderProductDetails() {
    const p = this.currentProduct;

    // Breadcrumbs
    const catLink = document.getElementById('product-category-link');
    const bProductTitle = document.getElementById('breadcrumb-product-title');
    if (catLink) {
      catLink.textContent = p.categoryName || p.department || "Departamento";
      catLink.onclick = () => window.navigateTo('category', { cat: p.categorySlug || 'perfumes-arabes' });
    }
    if (bProductTitle) bProductTitle.textContent = p.title;

    // Main Info
    const pSku = document.getElementById('product-sku');
    const pTitle = document.getElementById('product-title');
    const pOld = document.getElementById('detail-price-old');
    const pPix = document.getElementById('detail-pix-amount');
    const pTag = document.getElementById('detail-pix-tag');

    if (pSku) pSku.textContent = `SKU: ${p.sku || 'N/A'}`;
    if (pTitle) pTitle.textContent = p.title;
    if (pOld) pOld.textContent = `R$ ${p.price.toFixed(2).replace('.', ',')}`;

    const discount = p.pixDiscount || 8;
    const pixVal = p.price * (1 - (discount/100));
    if (pPix) pPix.textContent = `R$ ${pixVal.toFixed(2).replace('.', ',')}`;
    if (pTag) pTag.textContent = `-${discount}% NO PIX`;

    // Main Image & Thumbnails
    const mainImg = document.getElementById('main-product-img');
    const mainVideo = document.getElementById('main-product-video');
    if (mainImg) {
      mainImg.src = p.image;
      mainImg.alt = p.title;
      mainImg.style.display = 'block';
    }
    if (mainVideo) {
      mainVideo.pause();
      mainVideo.style.display = 'none';
      mainVideo.removeAttribute('src');
    }

    const thumbsContainer = document.getElementById('thumbnails-container');
    if (thumbsContainer) {
      const thumbs = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];
      let thumbsHtml = thumbs.map((imgSrc, idx) => `
        <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="window.productManager.changeMainImage('${imgSrc}', this)">
          <img src="${imgSrc}" alt="Miniatura ${idx + 1}">
        </div>
      `).join('');

      if (p.video) {
        thumbsHtml += `
          <div class="thumb-item thumb-video-item" onclick="window.productManager.playVideo('${p.video}', this)" title="Assistir vídeo do produto">
            <img class="thumb-video-poster" alt="Prévia do vídeo">
            <span class="thumb-video-play-icon">▶</span>
          </div>
        `;
      }

      thumbsContainer.innerHTML = thumbsHtml;

      if (p.video) {
        this.generateVideoThumbnail(p.video, thumbsContainer.querySelector('.thumb-video-poster'));
      }
    }

    // Variants Options
    const variantsContainer = document.getElementById('variants-options');
    if (variantsContainer) {
      const options = p.variants && p.variants.length > 0 ? p.variants : ["Tamanho Padrão"];
      this.selectedVariant = options[0];
      variantsContainer.innerHTML = options.map((v, idx) => `
        <button class="variant-btn ${idx === 0 ? 'active' : ''}" onclick="window.productManager.selectVariant('${v}', this)">
          ${v}
        </button>
      `).join('');
    }

    // Stock & Buy Button Block
    const buyContainer = document.getElementById('buy-button-container');
    const outOfStockBox = document.getElementById('out-of-stock-box');

    const hasStock = p.stockQuantity > 0 || p.inStock === true;

    if (hasStock) {
      if (outOfStockBox) outOfStockBox.style.display = 'none';
      if (buyContainer) {
        buyContainer.innerHTML = `
          <div style="display:flex; gap:14px; align-items:center;">
            <button onclick="window.productManager.handleBuyClick()" class="btn-primary" style="flex:1; padding: 16px 32px; font-size: 0.88rem; background: #059669; color:white; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow: 0 8px 20px rgba(5,150,105,0.25);">
              COMPRAR VIA WHATSAPP
            </button>
            <button onclick="window.productManager.handleAddToCart()" class="cart-icon-btn" style="width:54px; height:54px; border-radius:6px;" title="Adicionar à Sacola">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </button>
          </div>
        `;
      }
    } else {
      if (buyContainer) buyContainer.innerHTML = '';
      if (outOfStockBox) {
        outOfStockBox.style.display = 'block';
        outOfStockBox.innerHTML = `
          <div class="out-of-stock-title">PRODUTO INDISPONÍVEL NO MOMENTO</div>
          <p style="font-size:0.85rem; color:#404040;">Cadastre seu e-mail para receber um aviso assim que o produto retornar ao estoque:</p>
          <form class="notify-form" onsubmit="event.preventDefault(); alert('Obrigado. Notificaremos você assim que o lote retornar ao estoque.');">
            <input type="email" class="notify-input" placeholder="Seu melhor e-mail" required>
            <button type="submit" class="btn-primary" style="padding:12px 20px; font-size:0.75rem;">SOLICITAR AVISO</button>
          </form>
        `;
      }
    }

    // Dynamic Specs Rendering
    this.renderDynamicTabs(p);
  }

  renderDynamicTabs(p) {
    const pyramidPanel = document.getElementById('tab-panel-pyramid');
    const specsTable = document.getElementById('specs-table-body');
    
    if (!pyramidPanel || !specsTable) return;

    // Common Description
    let descHtml = `
      <div style="margin-bottom: 28px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: #0a0a0d; font-weight: 600; margin-bottom: 12px;">
          Detalhes do Produto
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.8; color: var(--color-text-main);">
          ${p.description || "Produto premium exclusivo."}
        </p>
      </div>
    `;

    const specType = p.specs ? p.specs.specType : (p.categorySlug && p.categorySlug.includes('perfumes') ? 'perfume' : 'other');

    if (specType === 'perfume') {
      const top = (p.specs && p.specs.topNotes) || "Cítricos e especiarias frescas";
      const heart = (p.specs && p.specs.heartNotes) || "Flores nobres e madeiras finas";
      const base = (p.specs && p.specs.baseNotes) || "Âmbar, OUD e Musk";

      pyramidPanel.innerHTML = descHtml + `
        <h4 style="font-family: var(--font-sans); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: #db2777; font-weight: 700; margin-bottom: 18px; text-align: center;">
          Pirâmide Olfativa
        </h4>
        <div class="pyramid-container">
          <div class="pyramid-tier">
            <h4>Notas de Saída (Topo)</h4>
            <p>${top}</p>
          </div>
          <div class="pyramid-tier">
            <h4>Notas de Corpo (Coração)</h4>
            <p>${heart}</p>
          </div>
          <div class="pyramid-tier">
            <h4>Notas de Fundo (Fixação)</h4>
            <p>${base}</p>
          </div>
        </div>
      `;

      specsTable.innerHTML = `
        <tr><td class="spec-name">Marca</td><td>${p.brand || 'MT Importados'}</td></tr>
        <tr><td class="spec-name">Garantia</td><td>100% Original com Autenticidade Garantida</td></tr>
        <tr><td class="spec-name">Procedência</td><td>Importação Direta</td></tr>
      `;

    } else if (specType === 'emagrecedores') {
      const active = (p.specs && p.specs.activeIngredient) || "Fórmula Avançada";
      const usage = (p.specs && p.specs.usage) || "Consultar bula do fabricante";
      const format = (p.specs && p.specs.format) || "Suplemento Premium";

      pyramidPanel.innerHTML = descHtml + `
        <h4 style="font-family: var(--font-sans); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: #059669; font-weight: 700; margin-bottom: 18px; text-align: center;">
          Informações Clínicas / Bula
        </h4>
        <div class="pyramid-container">
          <div class="pyramid-tier" style="background:#f0fdf4; border-color:#86efac;">
            <h4 style="color:#166534;">Princípio Ativo</h4>
            <p>${active}</p>
          </div>
          <div class="pyramid-tier" style="background:#f0fdf4; border-color:#86efac;">
            <h4 style="color:#166534;">Modo de Uso / Posologia</h4>
            <p>${usage}</p>
          </div>
          <div class="pyramid-tier" style="background:#f0fdf4; border-color:#86efac;">
            <h4 style="color:#166534;">Apresentação</h4>
            <p>${format}</p>
          </div>
        </div>
      `;

      specsTable.innerHTML = `
        <tr><td class="spec-name">Marca/Laboratório</td><td>${p.brand || 'Premium'}</td></tr>
        <tr><td class="spec-name">Autenticidade</td><td>Lote Rastreável 100% Original</td></tr>
        <tr><td class="spec-name">Envio</td><td>Condicionamento Térmico Adequado (se necessário)</td></tr>
      `;

    } else {
      // Exclusivos e outros
      const material = (p.specs && p.specs.material) || "Materiais Nobres Selecionados";
      const edition = (p.specs && p.specs.edition) || "Peça Exclusiva";

      pyramidPanel.innerHTML = descHtml + `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:20px;">
          <h4 style="font-size:1rem; margin-bottom:8px;">Especificações Físicas</h4>
          <p style="font-size:0.9rem; color:#475569; margin-bottom:12px;"><strong>Composição/Material:</strong> ${material}</p>
          <p style="font-size:0.9rem; color:#475569;"><strong>Coleção/Edição:</strong> ${edition}</p>
        </div>
      `;
    }

    // Build Dynamic Ficha Técnica Table Rows
    const s = p.specs || {};
    let tableRows = `
      <tr><td class="spec-name">Marca</td><td>${p.brand || 'MT Importados'}</td></tr>
      <tr><td class="spec-name">Código SKU</td><td>${p.sku || p.id}</td></tr>
    `;
    if (s.volume) tableRows += `<tr><td class="spec-name">Volume / Conteúdo</td><td>${s.volume}</td></tr>`;
    if (s.concentration) tableRows += `<tr><td class="spec-name">Concentração / Tipo</td><td>${s.concentration}</td></tr>`;
    if (s.fixation) tableRows += `<tr><td class="spec-name">Fixação / Duração</td><td>${s.fixation}</td></tr>`;
    if (s.family) tableRows += `<tr><td class="spec-name">Família Olfativa / Linha</td><td>${s.family}</td></tr>`;
    if (s.origin) tableRows += `<tr><td class="spec-name">Origem / Procedência</td><td>${s.origin}</td></tr>`;
    tableRows += `
      <tr><td class="spec-name">Garantia de Autenticidade</td><td>100% Original com Procedência Verificada</td></tr>
      <tr><td class="spec-name">Condição de Envio</td><td>Pronta Entrega com Rastreio Nacional</td></tr>
    `;
    specsTable.innerHTML = tableRows;
  }

  changeMainImage(imgSrc, el) {
    const mainImg = document.getElementById('main-product-img');
    const mainVideo = document.getElementById('main-product-video');
    if (mainVideo) {
      mainVideo.pause();
      mainVideo.style.display = 'none';
    }
    if (mainImg) {
      mainImg.src = imgSrc;
      mainImg.style.display = 'block';
    }

    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  generateVideoThumbnail(videoUrl, imgEl) {
    if (!imgEl) return;
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    video.addEventListener('loadeddata', () => {
      video.currentTime = Math.min(1, (video.duration || 2) / 2);
    });

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        imgEl.src = canvas.toDataURL('image/jpeg', 0.8);
      } catch (e) {
        console.warn('Não foi possível gerar a miniatura do vídeo:', e);
      }
    }, { once: true });

    video.src = videoUrl;
  }

  playVideo(videoUrl, el) {
    const mainImg = document.getElementById('main-product-img');
    const mainVideo = document.getElementById('main-product-video');
    if (mainImg) mainImg.style.display = 'none';
    if (mainVideo) {
      mainVideo.src = videoUrl;
      mainVideo.style.display = 'block';
      mainVideo.play().catch(() => {});
    }

    document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  selectVariant(variant, el) {
    this.selectedVariant = variant;
    document.querySelectorAll('.variant-btn').forEach(v => v.classList.remove('active'));
    if (el) el.classList.add('active');
  }

  handleBuyClick() {
    if (!this.currentProduct) return;
    if (window.cartManager) {
      window.cartManager.openWhatsAppModal({
        id: this.currentProduct.id,
        title: this.currentProduct.title,
        price: this.currentProduct.price,
        pixPrice: this.currentProduct.price * (1 - ((this.currentProduct.pixDiscount || 8) / 100)),
        image: this.currentProduct.image,
        quantity: 1,
        variant: this.selectedVariant || "Padrão"
      });
    }
  }

  handleAddToCart() {
    if (!this.currentProduct) return;
    if (window.cartManager) {
      window.cartManager.addItem(this.currentProduct, 1, this.selectedVariant || "Padrão");
    }
  }

  updateStickyBar() {
    const p = this.currentProduct;
    if (!p) return;

    const img = document.getElementById('sticky-bar-img');
    const title = document.getElementById('sticky-bar-title');
    const price = document.getElementById('sticky-bar-price');

    if (img) img.src = p.image;
    if (title) title.textContent = p.title;
    
    const discount = p.pixDiscount || 8;
    const pixVal = p.price * (1 - (discount/100));
    if (price) price.textContent = `R$ ${pixVal.toFixed(2).replace('.', ',')} no PIX`;
  }

  async loadReviews(productId) {
    if (!window.supabaseClient) return;
    const { data, error } = await window.supabaseClient
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    this.currentReviews = (!error && data) ? data : [];
    this.renderReviews();
  }

  renderReviews() {
    const reviews = this.currentReviews || [];
    const listEl = document.getElementById('reviews-list');
    const tabCountEl = document.getElementById('reviews-count-tab');
    const summaryEl = document.getElementById('product-rating-summary');

    if (tabCountEl) tabCountEl.textContent = reviews.length;

    const avg = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
      : 0;

    if (summaryEl) {
      if (reviews.length > 0) {
        summaryEl.innerHTML = `${'★'.repeat(Math.round(avg))}${'☆'.repeat(5 - Math.round(avg))} <span style="font-weight:600; color:var(--color-text-muted);">${avg.toFixed(1)} (${reviews.length} avaliação${reviews.length > 1 ? 'ões' : ''})</span>`;
      } else {
        summaryEl.textContent = 'Seja o primeiro a avaliar este produto';
      }
    }

    if (!listEl) return;

    if (reviews.length === 0) {
      listEl.innerHTML = '<p class="review-empty-msg">Ainda não há avaliações para este produto. Que tal deixar a primeira?</p>';
      return;
    }

    listEl.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-card-header">
          <div>
            <span class="review-author">${r.author_name}</span>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          </div>
          <span class="review-date">${new Date(r.created_at).toLocaleDateString('pt-BR')}</span>
        </div>
        <p class="review-comment">${r.comment || ''}</p>
      </div>
    `).join('');
  }

  bindReviewForm(productId) {
    const picker = document.getElementById('review-star-picker');
    if (picker && !picker.dataset.bound) {
      picker.dataset.bound = 'true';
      picker.querySelectorAll('.review-star').forEach(star => {
        star.addEventListener('click', () => {
          const value = parseInt(star.getAttribute('data-value'), 10);
          picker.setAttribute('data-rating', value);
          picker.querySelectorAll('.review-star').forEach(s => {
            s.classList.toggle('active', parseInt(s.getAttribute('data-value'), 10) <= value);
          });
        });
      });
    }

    const form = document.getElementById('review-form');
    if (form) {
      form.dataset.productId = productId;
      if (!form.dataset.bound) {
        form.dataset.bound = 'true';
        form.addEventListener('submit', (e) => this.submitReview(e));
      }
    }
  }

  async submitReview(e) {
    e.preventDefault();
    const form = e.target;
    const statusEl = document.getElementById('review-form-status');
    const submitBtn = document.getElementById('btn-submit-review');
    const picker = document.getElementById('review-star-picker');

    const authorName = document.getElementById('review-author-name').value.trim();
    const comment = document.getElementById('review-comment').value.trim();
    const rating = parseInt(picker ? picker.getAttribute('data-rating') : 5, 10);
    const productId = form.dataset.productId;

    if (!authorName || !comment) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const { error } = await window.supabaseClient.from('reviews').insert([{
      product_id: productId,
      author_name: authorName,
      rating,
      comment
    }]);

    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Avaliação';

    if (error) {
      if (statusEl) {
        statusEl.textContent = 'Erro ao enviar avaliação. Tente novamente.';
        statusEl.style.color = '#ef4444';
      }
      return;
    }

    if (statusEl) {
      statusEl.textContent = 'Avaliação enviada com sucesso. Obrigado!';
      statusEl.style.color = '#059669';
    }
    form.reset();
    if (picker) {
      picker.setAttribute('data-rating', 5);
      picker.querySelectorAll('.review-star').forEach(s => s.classList.add('active'));
    }
    this.loadReviews(productId);
  }

  bindTabEvents() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = e.target.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        document.querySelectorAll('.tab-content-panel').forEach(panel => {
          panel.classList.remove('active');
        });

        const targetPanel = document.getElementById(`tab-panel-${targetTab}`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  }
}

window.productManager = new ProductManager();
