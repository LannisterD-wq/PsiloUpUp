document.addEventListener('DOMContentLoaded', async () => {
  const stepAccount = document.getElementById('step-account');
  const stepShipping = document.getElementById('step-shipping');
  const stepReview = document.getElementById('step-review');

  const accountMessageEl = document.getElementById('account-message');
  const shippingMessageEl = document.getElementById('shipping-message');
  const addressMessageEl = document.getElementById('address-message');
  const checkoutMessageEl = document.getElementById('checkout-message');

  const shippingOptionsEl = document.getElementById('shipping-options');
  const addressListEl = document.getElementById('address-list');
  const checkoutItemsEl = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');
  const discountEl = document.getElementById('checkout-discount');

  const CEP_INPUT = document.getElementById('shipping-cep');
  const CEP_BUTTON = document.getElementById('shipping-calc');
  const ADDRESS_ADD = document.getElementById('address-add');
  const PAY_BUTTON = document.getElementById('checkout-pay');

  let selectedAddressId = null;
  let shippingQuote = null;
  let selectedShipping = null;

  function requireAuth() {
    if (!window.PSILOUP.auth.isAuthenticated()) {
      if (stepShipping) stepShipping.style.display = 'none';
      if (stepReview) stepReview.style.display = 'none';
      if (accountMessageEl) {
        accountMessageEl.textContent = 'Faça login para continuar. Você será redirecionado.';
        accountMessageEl.classList.add('error');
      }
      setTimeout(() => {
        window.location.href = 'login.html?redirect=checkout.html';
      }, 1200);
      return false;
    }
    return true;
  }

  async function renderCart() {
    const totals = await window.PSILOUP.cart.getTotals();
    const detailedItems = totals.items;
    if (!detailedItems.length) {
      if (checkoutItemsEl) {
        checkoutItemsEl.innerHTML = '<p>Seu carrinho está vazio.</p>';
      }
      if (PAY_BUTTON) PAY_BUTTON.disabled = true;
      if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
      if (discountEl) discountEl.textContent = 'R$ 0,00';
      if (shippingEl) shippingEl.textContent = 'Calcule com o CEP';
      if (totalEl) totalEl.textContent = 'R$ 0,00';
      return;
    }
    if (checkoutItemsEl) {
      checkoutItemsEl.innerHTML = detailedItems
        .map(
          (item) => `
        <div class="cart-row">
          <span>${item.product.name} x${item.qty}</span>
          <strong>${formatPrice(item.subtotalCents)}</strong>
        </div>
      `,
        )
        .join('');
    }
    if (subtotalEl) {
      subtotalEl.textContent = formatPrice(totals.subtotalCents);
    }
    if (discountEl) {
      discountEl.textContent = totals.discountCents ? `- ${formatPrice(totals.discountCents)}` : 'R$ 0,00';
    }

    const baseTotal = Math.max(0, totals.subtotalCents - totals.discountCents);
    const shippingCost = selectedShipping ? Number(selectedShipping.price_cents || 0) : 0;
    if (shippingEl) {
      shippingEl.textContent = selectedShipping
        ? `${selectedShipping.carrier || ''} ${selectedShipping.name || ''} - ${formatPrice(shippingCost)}`
        : 'Calcule com o CEP';
    }
    if (totalEl) {
      totalEl.textContent = formatPrice(baseTotal + shippingCost);
    }
    if (PAY_BUTTON) PAY_BUTTON.disabled = false;
  }

  function renderShippingOptions(quote) {
    if (!shippingOptionsEl) return;
    if (quote.services && Array.isArray(quote.services) && quote.services.length) {
      shippingOptionsEl.innerHTML = quote.services
        .map(
          (service, index) => `
        <label class="ship-option">
          <input type="radio" name="ship_service" value="${index}" ${selectedShipping === service ? 'checked' : ''} />
          <span>${service.carrier || ''} ${service.name || ''}</span>
          <span class="ship-price">${formatPrice(service.price_cents)}</span>
          <small>${service.delivery_time_days ? `${service.delivery_time_days} dia(s)` : ''}</small>
        </label>
      `,
        )
        .join('');
      shippingOptionsEl.style.display = 'block';
      const inputs = shippingOptionsEl.querySelectorAll('input[name="ship_service"]');
      if (inputs.length) {
        const defaultIndex = typeof shippingQuote?.selectedIndex === 'number' ? shippingQuote.selectedIndex : 0;
        inputs.forEach((input, idx) => {
          input.checked = idx === defaultIndex;
        });
        selectedShipping = quote.services[defaultIndex];
      }
      inputs.forEach((input) =>
        input.addEventListener('change', (event) => {
          const selected = quote.services[Number(event.target.value)];
          shippingQuote.selectedIndex = Number(event.target.value);
          selectedShipping = selected;
          renderCart();
        }),
      );
    } else {
      selectedShipping = {
        carrier: 'Frete',
        name: quote.free ? 'Grátis' : 'Padrão',
        price_cents: Number(quote.cost_cents || 0),
        delivery_time_days: quote.free ? null : undefined,
      };
      shippingOptionsEl.innerHTML = '';
      shippingOptionsEl.style.display = 'none';
    }
    renderCart();
  }

  async function handleQuote() {
    if (!CEP_INPUT || !shippingMessageEl) return;
    const cep = (CEP_INPUT.value || '').replace(/\D/g, '');
    if (cep.length !== 8) {
      shippingMessageEl.textContent = 'CEP inválido';
      shippingMessageEl.className = 'error';
      return;
    }
    shippingMessageEl.textContent = 'Calculando frete...';
    shippingMessageEl.className = 'info';
    try {
      const detailedItems = await window.PSILOUP.cart.getDetailedItems();
      if (!detailedItems.length) {
        shippingMessageEl.textContent = 'Carrinho vazio.';
        shippingMessageEl.className = 'error';
        return;
      }
      const payload = {
        to_cep: cep,
        items: detailedItems.map((item) => ({
          sku: item.product.sku,
          price_cents: item.product.priceCents,
          qty: item.qty,
        })),
      };
      const quote = await window.PSILOUP.api.post('/shipping/quote', payload);
      shippingQuote = quote;
      renderShippingOptions(quote);
      shippingMessageEl.textContent = 'Frete calculado.';
      shippingMessageEl.className = 'success';
    } catch (error) {
      shippingMessageEl.textContent = error.message || 'Falha ao calcular frete.';
      shippingMessageEl.className = 'error';
    }
  }

  async function loadAddresses() {
    if (!addressListEl) return;
    try {
      const addresses = await window.PSILOUP.api.get('/account/addresses', { auth: true });
      if (!addresses.length) {
        addressListEl.innerHTML = '<p>Nenhum endereço cadastrado.</p>';
        selectedAddressId = null;
        return;
      }
      const selected = selectedAddressId || addresses[0].id;
      addressListEl.innerHTML = addresses
        .map(
          (address) => `
        <label class="address-option">
          <input type="radio" name="address_id" value="${address.id}" ${Number(selected) === Number(address.id) ? 'checked' : ''}/>
          <span>${address.street}, ${address.number || ''} - ${address.city}/${address.state} - CEP ${address.cep}</span>
        </label>
      `,
        )
        .join('');
      selectedAddressId = selected;
      if (CEP_INPUT) {
        const currentAddress = addresses.find((addr) => Number(addr.id) === Number(selectedAddressId));
        if (currentAddress?.cep) {
          CEP_INPUT.value = String(currentAddress.cep).replace(/\D/g, '');
        }
      }
      addressListEl.addEventListener('change', (event) => {
        if (event.target && event.target.name === 'address_id') {
          selectedAddressId = Number(event.target.value);
          const chosen = addresses.find((addr) => Number(addr.id) === Number(selectedAddressId));
          if (CEP_INPUT && chosen?.cep) {
            CEP_INPUT.value = String(chosen.cep).replace(/\D/g, '');
          }
          shippingQuote = null;
          selectedShipping = null;
          if (shippingMessageEl) {
            shippingMessageEl.textContent = 'Calcule o frete para este endereço.';
            shippingMessageEl.className = '';
          }
        }
      });
    } catch (error) {
      addressMessageEl.textContent = 'Não foi possível carregar endereços.';
      addressMessageEl.className = 'error';
    }
  }

  async function submitOrder() {
    if (!PAY_BUTTON) return;
    PAY_BUTTON.disabled = true;
    checkoutMessageEl.textContent = 'Processando pagamento...';
    checkoutMessageEl.className = 'info';
    try {
      if (!selectedAddressId) {
        throw new Error('Selecione um endereço.');
      }
      if (!selectedShipping) {
        throw new Error('Selecione uma opção de frete.');
      }
      const totals = await window.PSILOUP.cart.getTotals();
      if (!totals.items.length) {
        throw new Error('Carrinho vazio.');
      }
      const payload = {
        items: totals.items.map((item) => ({
          sku: item.product.sku,
          price_cents: item.product.priceCents,
          qty: item.qty,
        })),
        address_id: selectedAddressId,
        shipping: selectedShipping,
        coupon_code: totals.coupon?.code || null,
      };
      const response = await window.PSILOUP.api.post('/checkout/create', payload, { auth: true });
      window.PSILOUP.cart.clearCart();
      checkoutMessageEl.textContent = 'Redirecionando para o pagamento...';
      checkoutMessageEl.className = 'success';
      if (response.init_point) {
        window.location.href = response.init_point;
      }
    } catch (error) {
      checkoutMessageEl.textContent = error.message || 'Falha ao iniciar pagamento.';
      checkoutMessageEl.className = 'error';
      PAY_BUTTON.disabled = false;
    }
  }

  function setupEvents() {
    if (CEP_BUTTON) {
      CEP_BUTTON.addEventListener('click', handleQuote);
    }
    if (ADDRESS_ADD) {
      ADDRESS_ADD.addEventListener('click', () => {
        window.location.href = 'account.html#novo-endereco';
      });
    }
    if (PAY_BUTTON) {
      PAY_BUTTON.addEventListener('click', submitOrder);
    }
  }

  function renderAccount() {
    if (!accountMessageEl) return;
    const user = window.PSILOUP.auth.getUser();
    if (user) {
      accountMessageEl.textContent = `Logado como ${user.email}`;
      accountMessageEl.className = 'success';
    }
  }

  function formatPrice(cents) {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // Boot
  if (!requireAuth()) return;
  setupEvents();
  await renderCart();
  await loadAddresses();
  renderAccount();
});

