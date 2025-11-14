window.PSILOUP = window.PSILOUP || {};

(function cartModule() {
  const { storageKeys } = window.PSILOUP.config;
  const cartKey = storageKeys.cart;
  const couponKey = storageKeys.coupon;

  function readCart() {
    try {
      const raw = localStorage.getItem(cartKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => item && item.sku && item.qty);
    } catch (error) {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(cartKey, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('psiloup-cart-updated'));
  }

  function upsertItem(sku, qtyDelta) {
    const items = readCart();
    const index = items.findIndex((item) => item.sku === sku);
    if (index >= 0) {
      items[index].qty = Math.max(1, items[index].qty + qtyDelta);
    } else {
      items.push({ sku, qty: Math.max(1, qtyDelta) });
    }
    writeCart(items);
    return items;
  }

  function setQuantity(sku, qty) {
    const items = readCart();
    const index = items.findIndex((item) => item.sku === sku);
    if (index >= 0) {
      if (qty <= 0) {
        items.splice(index, 1);
      } else {
        items[index].qty = qty;
      }
      writeCart(items);
    }
    return items;
  }

  function removeItem(sku) {
    const items = readCart().filter((item) => item.sku !== sku);
    writeCart(items);
    return items;
  }

  function clearCart() {
    localStorage.removeItem(cartKey);
    clearCoupon();
    window.dispatchEvent(new CustomEvent('psiloup-cart-updated'));
  }

  function getCoupon() {
    try {
      const raw = localStorage.getItem(couponKey);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function setCoupon(coupon) {
    if (!coupon) {
      clearCoupon();
      return;
    }
    localStorage.setItem(couponKey, JSON.stringify(coupon));
    window.dispatchEvent(new CustomEvent('psiloup-cart-updated'));
  }

  function clearCoupon() {
    localStorage.removeItem(couponKey);
  }

  async function getDetailedItems() {
    await window.PSILOUP.catalog.fetchProducts();
    const items = readCart();
    return items
      .map((item) => {
        const product = window.PSILOUP.catalog.getProductSync(item.sku);
        if (!product) return null;
        return {
          sku: product.sku,
          product,
          qty: item.qty,
          subtotalCents: product.priceCents * item.qty,
        };
      })
      .filter(Boolean);
  }

  async function validateCoupon(code, detailed, subtotalCents) {
    if (!code) return null;
    try {
      const payload = {
        code,
        subtotal_cents: subtotalCents,
        items: detailed.map((item) => ({
          id: item.product.sku,
          price_cents: item.product.priceCents,
          qty: item.qty,
        })),
      };
      const response = await window.PSILOUP.api.post('/coupons/validate', payload);
      if (response?.valid) {
        return {
          code,
          discount_cents: Number(response.discount_cents || 0),
          label: response.label || '',
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async function applyCoupon(code) {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) {
      clearCoupon();
      window.dispatchEvent(new CustomEvent('psiloup-cart-updated'));
      return { success: false, error: 'Informe um cupom.' };
    }
    const detailed = await getDetailedItems();
    const subtotalCents = detailed.reduce((sum, item) => sum + item.subtotalCents, 0);
    if (!subtotalCents) {
      return { success: false, error: 'Carrinho vazio.' };
    }
    const validated = await validateCoupon(trimmed, detailed, subtotalCents);
    if (validated) {
      setCoupon(validated);
      return { success: true, coupon: validated };
    }
    clearCoupon();
    return { success: false, error: 'Cupom inválido ou indisponível.' };
  }

  async function getTotals() {
    const detailed = await getDetailedItems();
    const subtotalCents = detailed.reduce((sum, item) => sum + item.subtotalCents, 0);
    let coupon = getCoupon();
    if (coupon && subtotalCents > 0) {
      const refreshed = await validateCoupon(coupon.code, detailed, subtotalCents);
      if (refreshed) {
        setCoupon(refreshed);
        coupon = refreshed;
      } else {
        clearCoupon();
        coupon = null;
      }
    }
    const discountCents = coupon ? Number(coupon.discount_cents || 0) : 0;
    return {
      items: detailed,
      subtotalCents,
      discountCents,
      coupon,
    };
  }

  window.PSILOUP.cart = {
    readCart,
    writeCart,
    addItem: (sku, qty = 1) => upsertItem(sku, qty),
    decreaseItem: (sku, qty = 1) => upsertItem(sku, -qty),
    setQuantity,
    removeItem,
    clearCart,
    getDetailedItems,
    getTotals,
    applyCoupon,
    getCoupon,
    clearCoupon,
  };
})();

