window.PSILOUP = window.PSILOUP || {};
const PSILOUP = window.PSILOUP;

function formatCurrency(cents) {
  return (Number(cents || 0) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    header.style.transform = 'translateY(0)';
  });
}

function initMenu() {
  const menuToggle = document.querySelector('.site-nav__toggle');
  const nav = document.querySelector('.site-nav');
  if (!menuToggle || !nav) return;
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    const isActive = nav.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', String(isActive));
    spans.forEach((span) => {
      span.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    });
    if (isActive && spans.length >= 3) {
      spans[0].style.transform = 'rotate(45deg) translateY(6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else if (spans.length >= 3) {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

function initSmoothScroll() {
  const header = document.querySelector('.site-header');
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const offset = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      const nav = document.querySelector('.site-nav');
      const menuToggle = document.querySelector('.site-nav__toggle');
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
          const spans = menuToggle.querySelectorAll('span');
          if (spans.length >= 3) {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
          }
        }
      }
    });
  });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll('.bundle-card, .step-card, .faq-grid details');
  if (!elements.length) return;
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
  });
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transition =
          'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
  );
  elements.forEach((el) => observer.observe(el));
}

function initButtonRipples() {
  document.querySelectorAll('.button, .site-actions__button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

function initFaqAnimations() {
  document.querySelectorAll('details').forEach((detail) => {
    detail.addEventListener('toggle', function onToggle() {
      if (!this.open) return;
      const content = this.querySelector('p');
      if (content) content.style.animation = 'slideDown 0.3s ease-out';
    });
  });
}

function initImageFadeIn() {
  document.querySelectorAll('img').forEach((img) => {
    const reveal = () => {
      img.style.opacity = '1';
    };
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in-out';
    if (img.complete) {
      reveal();
    } else {
      img.addEventListener('load', reveal, { once: true });
    }
  });
}

function initMetricsCounter() {
  const metrics = document.querySelectorAll('.hero__metrics li');
  if (!metrics.length) return;
  const animateCounter = (element, duration = 1800) => {
    const raw = element.textContent.trim();
    const prefix = (raw.match(/^[^\d]*/) || [''])[0];
    const suffix = (raw.match(/[^\d]*$/) || [''])[0];
    const digits = raw.replace(/[^\d]/g, '');
    const target = parseInt(digits, 10);
    if (!target || Number.isNaN(target)) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      element.textContent = `${prefix}${value.toLocaleString('pt-BR')}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`;
      }
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const strong = entry.target.querySelector('strong');
        if (strong && !strong.dataset.animated) {
          strong.dataset.animated = 'true';
          animateCounter(strong);
        }
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );
  metrics.forEach((item) => observer.observe(item));
}

const CartUI = {
  drawer: null,
  overlay: null,
  listEl: null,
  summaryEl: null,
  couponInput: null,
  couponMessage: null,
  ensureDrawer() {
    if (this.drawer) return;
    this.overlay = document.createElement('div');
    this.overlay.className = 'cart-overlay';
    this.overlay.addEventListener('click', () => this.close());
    this.drawer = document.createElement('aside');
    this.drawer.className = 'cart-drawer';
    this.drawer.innerHTML = `
      <div class="cart-drawer__header">
        <h3>Seu carrinho</h3>
        <button class="button button--ghost" type="button" data-cart-close>Fechar</button>
      </div>
      <div class="cart-drawer__list"></div>
      <div class="cart-summary">
        <div class="cart-row"><span>Subtotal</span><strong class="cart-subtotal__value">R$ 0,00</strong></div>
        <div class="cart-row"><span>Desconto</span><strong class="cart-discount__value">R$ 0,00</strong></div>
        <div class="cart-row"><span>Frete</span><strong class="cart-shipping__value">Calcule no checkout</strong></div>
        <div class="cart-total"><span>Total</span><strong class="cart-total__value">R$ 0,00</strong></div>
      </div>
      <div class="cart-coupon">
        <input type="text" placeholder="Cupom de desconto" data-cart-coupon-input />
        <button class="button button--xs" type="button" data-cart-coupon-apply>Aplicar</button>
        <small data-cart-coupon-message></small>
      </div>
      <div class="cart-drawer__footer">
        <a class="button button--primary cart-checkout" href="checkout.html">Finalizar compra</a>
      </div>
    `;
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.drawer);
    this.drawer.querySelector('[data-cart-close]')?.addEventListener('click', () => this.close());
    this.listEl = this.drawer.querySelector('.cart-drawer__list');
    this.summaryEl = this.drawer.querySelector('.cart-summary');
    this.couponInput = this.drawer.querySelector('[data-cart-coupon-input]');
    this.couponMessage = this.drawer.querySelector('[data-cart-coupon-message]');

    const applyCoupon = async () => {
      if (!this.couponInput) return;
      const result = await PSILOUP.cart.applyCoupon(this.couponInput.value);
      if (this.couponMessage) {
        this.couponMessage.textContent = result.success
          ? 'Cupom aplicado!'
          : (result.error || 'Não foi possível aplicar o cupom.');
      }
      await this.render();
    };

    this.drawer.querySelector('[data-cart-coupon-apply]')?.addEventListener('click', applyCoupon);
    this.couponInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applyCoupon();
      }
    });

    this.drawer.addEventListener('click', async (event) => {
      const removeBtn = event.target.closest('[data-remove-item]');
      if (removeBtn) {
        const sku = removeBtn.getAttribute('data-remove-item');
        PSILOUP.cart.removeItem(sku);
        await this.render();
        return;
      }
      const incBtn = event.target.closest('[data-qty-inc]');
      if (incBtn) {
        const sku = incBtn.getAttribute('data-qty-inc');
        PSILOUP.cart.addItem(sku, 1);
        await this.render();
        return;
      }
      const decBtn = event.target.closest('[data-qty-dec]');
      if (decBtn) {
        const sku = decBtn.getAttribute('data-qty-dec');
        PSILOUP.cart.decreaseItem(sku, 1);
        await this.render();
      }
    });

    this.drawer.addEventListener('change', async (event) => {
      const input = event.target.closest('[data-qty-input]');
      if (!input) return;
      const sku = input.getAttribute('data-qty-input');
      const next = Math.max(1, parseInt(input.value, 10) || 1);
      PSILOUP.cart.setQuantity(sku, next);
      await this.render();
    });
  },
  async render() {
    this.ensureDrawer();
    const { items, subtotalCents, discountCents, coupon } = await PSILOUP.cart.getTotals();
    if (!items.length) {
      this.listEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
      this.summaryEl.querySelector('.cart-subtotal__value').textContent = 'R$ 0,00';
      this.summaryEl.querySelector('.cart-discount__value').textContent = 'R$ 0,00';
      this.summaryEl.querySelector('.cart-total__value').textContent = 'R$ 0,00';
      this.couponInput && (this.couponInput.value = '');
      if (this.couponMessage) this.couponMessage.textContent = '';
      return;
    }
    const fallbackImg = 'images/LOGO.png';
    this.listEl.innerHTML = items
      .map((item) => {
        const image = item.product.imageUrl || fallbackImg;
        return `
        <div class="cart-item">
          <img class="cart-item__image" src="${image}" alt="${item.product.name}" onerror="this.src='${fallbackImg}'" />
          <div class="cart-item__meta">
            <strong>${item.product.name}</strong>
            <p>${formatCurrency(item.product.priceCents)} unidade</p>
          </div>
          <div class="cart-item__qty">
            <button class="button button--xs" type="button" data-qty-dec="${item.product.sku}">-</button>
            <input class="cart-item__qty-input" type="number" min="1" value="${item.qty}" data-qty-input="${item.product.sku}" />
            <button class="button button--xs" type="button" data-qty-inc="${item.product.sku}">+</button>
          </div>
          <div class="cart-item__total">
            <span>${formatCurrency(item.subtotalCents)}</span>
            <button class="button button--ghost" type="button" data-remove-item="${item.product.sku}">Remover</button>
          </div>
        </div>
      `;
      })
      .join('');
    const totalCents = Math.max(0, subtotalCents - discountCents);
    this.summaryEl.querySelector('.cart-subtotal__value').textContent = formatCurrency(subtotalCents);
    this.summaryEl.querySelector('.cart-discount__value').textContent = discountCents
      ? `- ${formatCurrency(discountCents)}`
      : 'R$ 0,00';
    this.summaryEl.querySelector('.cart-total__value').textContent = formatCurrency(totalCents);
    if (this.couponInput) {
      this.couponInput.value = coupon?.code || '';
    }
    if (this.couponMessage) {
      this.couponMessage.textContent = coupon?.label || '';
    }
  },
  open() {
    this.ensureDrawer();
    this.render();
    this.overlay.classList.add('active');
    this.drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  close() {
    if (!this.drawer || !this.overlay) return;
    this.overlay.classList.remove('active');
    this.drawer.classList.remove('active');
    document.body.style.overflow = '';
  },
};

function updateCartBadge() {
  const badgeEl = document.querySelector('.site-actions__icon[aria-label="Carrinho"]');
  if (!badgeEl) return;
  const items = PSILOUP.cart.readCart();
  const totalQty = items.reduce((sum, item) => sum + (item.qty || 0), 0);
  let dot = badgeEl.querySelector('.cart-dot');
  if (!dot) {
    dot = document.createElement('span');
    dot.className = 'cart-dot';
    dot.style.position = 'absolute';
    dot.style.top = '-6px';
    dot.style.right = '-6px';
    dot.style.background = '#25c2ff';
    dot.style.color = '#000';
    dot.style.fontWeight = '700';
    dot.style.borderRadius = '10px';
    dot.style.padding = '0 6px';
    dot.style.fontSize = '10px';
    dot.style.lineHeight = '16px';
    badgeEl.style.position = 'relative';
    badgeEl.appendChild(dot);
  }
  dot.textContent = totalQty > 0 ? String(totalQty) : '';
}

function showCartToast(message) {
  let toast = document.querySelector('.cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('active');
  setTimeout(() => toast.classList.remove('active'), 2000);
}

function attachAddToCartListeners() {
  document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const sku = button.getAttribute('data-product-id');
      const qty = Number(button.getAttribute('data-qty') || '1');
      if (!sku) return;
      await PSILOUP.catalog.fetchProducts();
      PSILOUP.cart.addItem(sku, qty);
      updateCartBadge();
      showCartToast('Adicionado ao carrinho!');
      CartUI.render();
    });
  });
}

function attachCartIconListener() {
  const cartIcon = document.querySelector('.site-actions__icon[aria-label="Carrinho"]');
  if (!cartIcon) return;
  cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    CartUI.open();
  });
}

function initCart() {
  if (!PSILOUP.cart) return;
  CartUI.ensureDrawer();
  updateCartBadge();
  attachAddToCartListeners();
  attachCartIconListener();
  window.addEventListener('psiloup-cart-updated', () => {
    updateCartBadge();
    if (CartUI.drawer?.classList.contains('active')) {
      CartUI.render();
    }
  });
}

function boot() {
  initHeader();
  initMenu();
  initSmoothScroll();
  initRevealAnimations();
  initButtonRipples();
  initFaqAnimations();
  initImageFadeIn();
  initMetricsCounter();
  initCart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
