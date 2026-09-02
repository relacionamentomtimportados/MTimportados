/* ==========================================================================
   CART & WHATSAPP DIRECT CHECKOUT CONTROLLER (MT IMPORTADOS $20,000 HAUTE COUTURE)
   ========================================================================== */

class CartManager {
  constructor() {
    this.cart = this.loadCartFromStorage();
    this.currentCheckoutProduct = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindEvents();
      this.updateCartBadge();
    });
  }

  loadCartFromStorage() {
    const saved = localStorage.getItem('arome_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 1,
        title: "Maison Alhambra Jean Lowe Immortel EDP 100ml",
        price: 549.00,
        pixPrice: 473.10,
        image: "assets/products/product_1.jpg",
        quantity: 1,
        variant: "100ml Original"
      }
    ];
  }

  saveCart() {
    localStorage.setItem('arome_cart', JSON.stringify(this.cart));
    this.updateCartBadge();
  }

  updateCartBadge() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = totalItems;
    });
  }

  bindEvents() {
    document.querySelectorAll('.cart-trigger').forEach(btn => {
      btn.addEventListener('click', () => this.openDrawer());
    });

    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeDrawer();
      });
    }
  }

  addItem(product, quantity = 1, variant = "100ml Original") {
    const existingIndex = this.cart.findIndex(i => i.id === product.id && i.variant === variant);
    const pixPrice = product.pixPrice || (product.price * 0.95);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        pixPrice: pixPrice,
        image: product.image,
        quantity: quantity,
        variant: variant
      });
    }

    this.saveCart();
    this.showToast(`Item "${product.title}" adicionado à sacola.`);
  }

  removeItem(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.renderCartDrawer();
  }

  updateQuantity(index, delta) {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.saveCart();
      this.renderCartDrawer();
    }
  }

  openDrawer() {
    this.renderCartDrawer();
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.add('active');
  }

  closeDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  renderCartDrawer() {
    const container = document.getElementById('cart-drawer-items');
    const summaryContainer = document.getElementById('cart-drawer-summary');
    if (!container || !summaryContainer) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 50px 20px; color: var(--color-text-muted);">
          <h4 style="font-family:var(--font-serif); font-size:1.4rem; color:#0a0a0d; margin-bottom:8px;">Sua Sacola Está Vazia</h4>
          <p style="font-size:0.85rem;">Explore nossos departamentos exclusivos.</p>
          <button onclick="window.cartManager.closeDrawer(); window.navigateTo('home');" class="btn-primary" style="margin-top:20px;">
            VER COLEÇÕES
          </button>
        </div>
      `;
      summaryContainer.innerHTML = '';
      return;
    }

    let itemsHTML = '';
    let totalNormal = 0;
    let totalPix = 0;

    this.cart.forEach((item, idx) => {
      const itemTotalNormal = item.price * item.quantity;
      const itemTotalPix = (item.pixPrice || (item.price * 0.92)) * item.quantity;
      totalNormal += itemTotalNormal;
      totalPix += itemTotalPix;
      const itemDiscountPercent = item.price > 0 ? (((item.price - (item.pixPrice || (item.price * 0.92))) / item.price) * 100).toFixed(0) : 0;

      itemsHTML += `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-variant">Opção: ${item.variant}</div>
            <div class="cart-item-price">R$ ${itemTotalPix.toFixed(2).replace('.', ',')} no PIX <span style="color:#059669; font-size:0.75rem; font-weight:700;">(-${itemDiscountPercent}%)</span></div>
            
            <div class="cart-qty-controls">
              <button class="qty-btn" onclick="window.cartManager.updateQuantity(${idx}, -1)">-</button>
              <span style="font-weight:700; font-size:0.85rem;">${item.quantity}</span>
              <button class="qty-btn" onclick="window.cartManager.updateQuantity(${idx}, 1)">+</button>
              <button class="btn-remove-item" onclick="window.cartManager.removeItem(${idx})">Remover</button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = itemsHTML;

    const totalSavings = totalNormal - totalPix;
    const effectivePixPercent = totalNormal > 0 ? ((totalSavings / totalNormal) * 100).toFixed(1) : '0.0';

    summaryContainer.innerHTML = `
      <div class="cart-summary-line">
        <span>Subtotal (Preço Regular)</span>
        <span>R$ ${totalNormal.toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="cart-summary-line" style="color:var(--color-green-pix); font-weight:600;">
        <span>Desconto Total no PIX (-${effectivePixPercent}%)</span>
        <span>- R$ ${totalSavings.toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="cart-summary-line total">
        <span>Total com Desconto PIX</span>
        <span style="color:var(--color-green-pix);">R$ ${totalPix.toFixed(2).replace('.', ',')}</span>
      </div>
      
      <button onclick="window.cartManager.openCheckoutFromCart()" class="btn-checkout" style="background:#059669; display:flex; align-items:center; justify-content:center; gap:8px;">
        FINALIZAR COMPRA
      </button>
    `;
  }

  // ==========================================================================
  // CHECKOUT MODAL (redireciona pro Mercado Pago)
  // ==========================================================================
  openCheckoutModal(productObj) {
    this.currentCheckoutProduct = productObj;

    const modal = document.getElementById('whatsapp-checkout-modal');
    const thumb = document.getElementById('checkout-modal-thumb');
    const title = document.getElementById('checkout-modal-title');
    const details = document.getElementById('checkout-modal-details');
    const price = document.getElementById('checkout-modal-price');

    if (!modal) return;

    const qty = productObj.quantity || 1;
    const isCart = productObj.id === 'cart-combined';

    if (isCart) {
      const totalRegular = this.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      const totalPix = this.cart.reduce((sum, i) => sum + ((i.pixPrice || (i.price * 0.92)) * i.quantity), 0);
      const totalSavings = totalRegular - totalPix;
      const effectivePercent = totalRegular > 0 ? ((totalSavings / totalRegular) * 100).toFixed(1) : '0';

      if (thumb) thumb.src = this.cart[0] ? this.cart[0].image : 'assets/products/product_1.jpg';
      if (title) title.textContent = `Carrinho de Compras (${this.cart.reduce((sum, i) => sum + i.quantity, 0)} itens)`;
      if (details) details.textContent = this.cart.map(i => `${i.quantity}x ${i.title}`).join(' | ');
      if (price) price.textContent = `R$ ${totalPix.toFixed(2).replace('.', ',')} no PIX (Economia de R$ ${totalSavings.toFixed(2).replace('.', ',')} / -${effectivePercent}%)`;
    } else {
      const unitPix = productObj.pixPrice || (productObj.price * 0.92);
      const pixVal = unitPix * qty;
      const singleSavings = (productObj.price * qty) - pixVal;
      const singlePercent = productObj.price > 0 ? (((productObj.price - unitPix) / productObj.price) * 100).toFixed(1) : '0';

      if (thumb) thumb.src = productObj.image || 'assets/products/product_1.jpg';
      if (title) title.textContent = productObj.title;
      if (details) details.textContent = `${qty}x Unidade(s) | Opção: ${productObj.variant || 'Padrão'}`;
      if (price) price.textContent = `R$ ${pixVal.toFixed(2).replace('.', ',')} no PIX (Desconto de -${singlePercent}%)`;
    }

    modal.classList.add('active');
  }

  openCheckoutCurrentProduct() {
    const currentProduct = window.PRODUCTS_DATA ? window.PRODUCTS_DATA[0] : null;
    if (currentProduct) {
      this.openCheckoutModal(currentProduct);
    }
  }

  openCheckoutFromCart() {
    this.closeDrawer();
    if (this.cart.length > 0) {
      const firstItem = this.cart[0];
      const combinedTitle = this.cart.map(i => `${i.title} (${i.quantity}x)`).join(', ');
      const totalPix = this.cart.reduce((sum, i) => sum + ((i.pixPrice || (i.price * 0.92)) * i.quantity), 0);
      const totalRegular = this.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

      this.openCheckoutModal({
        id: 'cart-combined',
        title: combinedTitle,
        price: totalRegular,
        pixPrice: totalPix,
        image: firstItem.image,
        quantity: 1,
        variant: "Carrinho Completo"
      });
    }
  }

  closeCheckoutModal() {
    const modal = document.getElementById('whatsapp-checkout-modal');
    if (modal) modal.classList.remove('active');
  }

  async submitCheckout(e) {
    e.preventDefault();

    const nameInput = document.getElementById('checkout-user-name');
    const phoneInput = document.getElementById('checkout-user-phone');
    const emailInput = document.getElementById('checkout-user-email');
    const submitBtn = document.querySelector('#whatsapp-checkout-form button[type="submit"]');

    if (!nameInput || !phoneInput || !emailInput) return;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !phone || !email) {
      alert("Por favor, preencha todos os campos obrigatórios (Nome, Telefone e E-mail).");
      return;
    }

    const checkoutTarget = this.currentCheckoutProduct;
    let items;

    if (checkoutTarget && checkoutTarget.id === 'cart-combined' && this.cart.length > 0) {
      items = this.cart.map(item => ({
        product_id: item.id,
        variant: item.variant || 'Padrão',
        quantity: item.quantity
      }));
    } else {
      const item = checkoutTarget || (this.cart.length > 0 ? this.cart[0] : null);
      if (!item) {
        alert("Nenhum produto selecionado para a compra.");
        return;
      }
      items = [{
        product_id: item.id,
        variant: item.variant || 'Padrão',
        quantity: item.quantity || 1
      }];
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Gerando pagamento...';
    }

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: { name, phone, email }
        })
      });

      const data = await response.json();

      if (!response.ok || !data.init_point) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento.');
      }

      // Clear the cart before leaving — the order already exists in Supabase
      // regardless of what happens next on Mercado Pago's side.
      this.cart = [];
      this.saveCart();
      this.closeCheckoutModal();

      window.location.href = data.init_point;
    } catch (err) {
      console.error('Erro ao iniciar checkout:', err);
      alert('Não foi possível iniciar o pagamento. Tente novamente em instantes.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'IR PARA O PAGAMENTO';
      }
    }
  }

  showToast(msg) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: #0a0a0d;
        color: #f472b6;
        border: 1px solid #db2777;
        padding: 14px 28px;
        border-radius: 8px;
        font-family: var(--font-sans);
        font-weight: 700;
        font-size: 0.82rem;
        letter-spacing: 0.05em;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        z-index: 9999;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2800);
  }
}

window.cartManager = new CartManager();
