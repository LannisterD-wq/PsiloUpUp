// Checkout PsiloUp — fluxo em 3 etapas
const API_BASE = window.PSILOUP_API_BASE || '';
const FREE_SHIPPING_THRESHOLD = 39900;
let shippingQuote = null; // { cost_cents, free, threshold_cents } ou { services: [{name, price_cents, delivery_time_days, carrier}], selectedIndex }
let selectedAddressId = null;

function authHeader(){
  const t = localStorage.getItem('psiloup_token');
  return t ? { Authorization: `Bearer ${t}` } : {};
}

function getAuth(){
  const t = localStorage.getItem('psiloup_token');
  const u = localStorage.getItem('psiloup_user');
  if(!t) return null;
  try {
    const [,payload] = t.split('.');
    const json = JSON.parse(atob(payload.replace(/-/g,'+').replace(/_/g,'/')));
    const exp = Number(json.exp||0)*1000;
    if(Date.now() > exp) return null;
    return { token: t, user: u ? JSON.parse(u) : null };
  } catch { return null; }
}

function formatPrice(cents){ return `R$ ${(Number(cents||0)/100).toFixed(2)}`; }

function renderShippingOptions(){
  const container = document.getElementById('shipping-options');
  if (!container) return;
  if (shippingQuote && Array.isArray(shippingQuote.services) && shippingQuote.services.length) {
    container.style.display = 'block';
    container.innerHTML = shippingQuote.services.map((s, idx) => `
      <label class="ship-option">
        <input type="radio" name="ship_service" value="${idx}" ${shippingQuote.selectedIndex===idx?'checked':''} />
        <span>${s.carrier} — ${s.name}</span>
        <span class="ship-price">${formatPrice(Number(s.price_cents||0))}</span>
        <small>${s.delivery_time_days ? `${s.delivery_time_days} dia(s)` : ''}</small>
      </label>
    `).join('');
    container.querySelectorAll('input[name="ship_service"]').forEach(inp => {
      inp.addEventListener('change', (e) => {
        shippingQuote.selectedIndex = Number(e.target.value);
        renderReview();
      });
    });
  } else {
    container.style.display = 'none';
    container.innerHTML = '';
  }
}

function renderReview(){
  const itemsList = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const discountEl = document.getElementById('checkout-discount');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');

  const cartRaw = localStorage.getItem('psiloup_cart');
  const cart = cartRaw ? JSON.parse(cartRaw) : { items: [] };
  const items = cart.items || [];
  const subtotal = items.reduce((acc, it) => acc + Number(it.cents||0)*Number(it.qty||1), 0);
  const discount_cents = Number(cart.discount_cents||0);

  if(itemsList){
    itemsList.innerHTML = items.map(it => `<div class="cart-row"><span>${it.title||'Item'} x${it.qty||1}</span><strong>${formatPrice((Number(it.cents||0)*Number(it.qty||1)))}</strong></div>`).join('');
  }
  if(subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if(discountEl) discountEl.textContent = formatPrice(discount_cents);

  let shippingCost = 0;
  if (shippingQuote && Array.isArray(shippingQuote.services)){
    const idx = typeof shippingQuote.selectedIndex==='number' ? shippingQuote.selectedIndex : 0;
    const sel = shippingQuote.services[idx];
    shippingCost = sel ? Number(sel.price_cents||0) : 0;
    if (shippingEl) shippingEl.textContent = sel ? `${sel.carrier} — ${sel.name}: ${formatPrice(shippingCost)}` : 'Selecione um serviço de frete';
  } else {
    shippingCost = shippingQuote ? Number(shippingQuote.cost_cents||0) : 0;
    if (shippingEl) shippingEl.textContent = shippingQuote ? (shippingQuote.free ? 'Grátis' : formatPrice(shippingCost)) : 'Calcule com o CEP';
  }

  const total = Math.max(0, subtotal - discount_cents + shippingCost);
  if(totalEl) totalEl.textContent = formatPrice(total);

  renderShippingOptions();
}

async function loadAddresses(){
  const listEl = document.getElementById('address-list');
  const msgEl = document.getElementById('address-message');
  if(!listEl) return;
  try{
    const res = await fetch(`${API_BASE}/account/addresses`, { headers: { 'Content-Type':'application/json', ...authHeader() } });
    if(!res.ok){ listEl.innerHTML = '<p>Falha ao carregar endereços.</p>'; return; }
    const addrs = await res.json();
    if(!Array.isArray(addrs) || !addrs.length){ listEl.innerHTML = '<p>Você ainda não possui endereços salvos.</p>'; return; }
    listEl.innerHTML = addrs.map(a => `
      <div class="address-option">
        <input type="radio" id="addr-${a.id}" name="address_id" value="${a.id}" ${selectedAddressId===a.id?'checked':''} />
        <label for="addr-${a.id}">${a.street}, ${a.number}${a.complement?(' - '+a.complement):''} - ${a.neighborhood} - ${a.city}/${a.state} - CEP ${a.cep}</label>
      </div>
    `).join('');
    listEl.querySelectorAll('input[name="address_id"]').forEach(inp => {
      inp.addEventListener('change', (e) => { selectedAddressId = Number(e.target.value); 
        const shippingCepInput = document.getElementById('shipping-cep');
        const sel = addrs.find(a => a.id === selectedAddressId);
        if (shippingCepInput && sel && sel.cep) shippingCepInput.value = String(sel.cep).replace(/\D/g,'').padStart(8,'0');
      });
    });
    // default
    if(!selectedAddressId && addrs[0]) selectedAddressId = addrs[0].id;
    // Prefill CEP com endereço selecionado
    const shippingCepInput = document.getElementById('shipping-cep');
    const sel = addrs.find(a => a.id === selectedAddressId);
    if (shippingCepInput && sel && sel.cep) shippingCepInput.value = String(sel.cep).replace(/\D/g,'').padStart(8,'0');
  }catch(err){
    if(msgEl) msgEl.textContent = 'Erro ao carregar endereços.';
  }
}

function init(){
  const accountEmail = document.getElementById('account-email');
  const accountBtn = document.getElementById('account-continue');
  const accountMsg = document.getElementById('account-message');

  const cepInput = document.getElementById('shipping-cep');
  const cepBtn = document.getElementById('shipping-calc');
  const cepMsg = document.getElementById('shipping-message');

  const payBtn = document.getElementById('checkout-pay');
  const payMsg = document.getElementById('checkout-message');

  const addressAddBtn = document.getElementById('address-add');
  const addressSelectEl = document.getElementById('address-select');
  // Se estiver autenticado, esconder email e mostrar mensagem de logado
  const auth = getAuth();
  if (auth && accountEmail && accountBtn) {
    accountEmail.style.display = 'none';
    accountBtn.style.display = 'none';
    if(accountMsg) accountMsg.textContent = `Logado como ${auth.user?.email || 'sua conta'}.`;
    document.getElementById('step-shipping')?.scrollIntoView({ behavior: 'smooth' });
    loadAddresses();
  } else {
    if(accountBtn){
      accountBtn.addEventListener('click', () => {
        const email = String(accountEmail?.value||'').trim();
        if(!email){ accountMsg.textContent = 'Informe seu e-mail.'; return; }
        localStorage.setItem('psiloup_buyer_email', email);
        accountMsg.textContent = 'E-mail confirmado. Agora calcule o frete.';
        document.getElementById('step-shipping')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // Adição de novo endereço
  if(addressAddBtn && addressSelectEl){
    addressAddBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msgEl = document.getElementById('address-message');
      const isAuth = !!getAuth();
      if(!isAuth){ if(msgEl) msgEl.textContent = 'Faça login para adicionar novos endereços.'; return; }
      if(document.getElementById('address-form')){ document.getElementById('address-form').style.display='block'; return; }
      addressSelectEl.insertAdjacentHTML('beforeend', `
        <form id="address-form" class="cart-address__form" style="margin-top:10px; display:block;">
          <input type="text" id="addr-street" placeholder="Rua" />
          <input type="text" id="addr-number" placeholder="Número" />
          <input type="text" id="addr-complement" placeholder="Complemento" />
          <input type="text" id="addr-neighborhood" placeholder="Bairro" />
          <input type="text" id="addr-city" placeholder="Cidade" />
          <input type="text" id="addr-state" placeholder="Estado (UF)" />
          <input type="text" id="addr-cep" placeholder="CEP" />
          <div class="cart-row">
            <button type="button" class="button button--primary" id="address-save">Salvar endereço</button>
            <button type="button" class="button" id="address-cancel">Cancelar</button>
          </div>
        </form>
      `);
      document.getElementById('address-save').addEventListener('click', async () => {
        const street = String(document.getElementById('addr-street').value||'').trim();
        const number = String(document.getElementById('addr-number').value||'').trim();
        const complement = String(document.getElementById('addr-complement').value||'').trim();
        const neighborhood = String(document.getElementById('addr-neighborhood').value||'').trim();
        const city = String(document.getElementById('addr-city').value||'').trim();
        const state = String(document.getElementById('addr-state').value||'').trim();
        const cep = String(document.getElementById('addr-cep').value||'').replace(/\D/g,'');
        if(!street || !number || !neighborhood || !city || !state || cep.length!==8){ if(msgEl) msgEl.textContent = 'Preencha todos os campos obrigatórios e um CEP válido.'; return; }
        try{
          const res = await fetch(`${API_BASE}/account/addresses`, { method:'POST', headers:{ 'Content-Type':'application/json', ...authHeader() }, body: JSON.stringify({ street, number, complement, neighborhood, city, state, cep }) });
          if(!res.ok){ if(msgEl) msgEl.textContent = 'Não foi possível salvar o endereço.'; return; }
          const addr = await res.json();
          selectedAddressId = addr.id;
          await loadAddresses();
          const cepInputEl = document.getElementById('shipping-cep');
          if(cepInputEl) cepInputEl.value = String(addr.cep).replace(/\D/g,'');
          const formEl = document.getElementById('address-form'); if(formEl) formEl.remove();
          if(msgEl) msgEl.textContent = 'Endereço adicionado.';
        }catch(err){ if(msgEl) msgEl.textContent = 'Erro ao salvar endereço.'; }
      });
      document.getElementById('address-cancel').addEventListener('click', () => { const f = document.getElementById('address-form'); if(f) f.remove(); });
    });
  }

  // Etapa 2: cálculo de frete
  if(cepBtn){
    cepBtn.addEventListener('click', async () => {
      const cep = String(cepInput?.value||'').replace(/\D/g,'');
      if(cep.length !== 8){ cepMsg.textContent = 'CEP inválido. Use 8 dígitos.'; return; }
      try{
        const cartRaw = localStorage.getItem('psiloup_cart');
        const cart = cartRaw ? JSON.parse(cartRaw) : { items: [] };
        const items_cents = (cart.items||[]).map(it => ({ cents: Number(it.cents||0), qty: Number(it.qty||1) }));
        const res = await fetch(`${API_BASE}/shipping/quote`, {
          method: 'POST', headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({ to_cep: cep, items_cents })
        });
        if(!res.ok){ cepMsg.textContent = 'Não foi possível calcular o frete.'; return; }
        const data = await res.json();
        if (data && Array.isArray(data.services)) {
          shippingQuote = { services: data.services, selectedIndex: 0 };
          cepMsg.textContent = 'Selecione um serviço de frete abaixo.';
        } else {
          shippingQuote = { cost_cents: Number(data.cost_cents||0), free: !!data.free, threshold_cents: Number(data.threshold_cents||FREE_SHIPPING_THRESHOLD) };
          cepMsg.textContent = shippingQuote.free ? 'Frete grátis habilitado!' : `Frete: ${formatPrice(shippingQuote.cost_cents)}`;
        }
        renderReview();
      } catch(err){
        cepMsg.textContent = 'Erro ao calcular frete.';
      }
    });
  }

  // Pagamento
  if(payBtn){
    payBtn.addEventListener('click', async () => {
      try{
        const cartRaw = localStorage.getItem('psiloup_cart');
        const cart = cartRaw ? JSON.parse(cartRaw) : { items: [] };
        const items = cart.items || [];
        const items_cents = items.map(it => ({ cents: Number(it.cents||0), qty: Number(it.qty||1) }));
        const discount_cents = Number(cart.discount_cents||0);
        if (!shippingQuote) { payMsg.textContent = 'Calcule o frete antes de pagar.'; return; }

        let shipping_cents = 0;
        if (shippingQuote.services) {
          const sel = shippingQuote.services[shippingQuote.selectedIndex||0];
          shipping_cents = sel ? Number(sel.price_cents||0) : 0;
        } else {
          shipping_cents = Number(shippingQuote.cost_cents||0);
        }
        const buyer = getAuth()?.user || { email: localStorage.getItem('psiloup_buyer_email') };
        if (!buyer || (!buyer.email && !buyer.name)) { payMsg.textContent = 'Informe seu e-mail antes de pagar.'; return; }
        if (!selectedAddressId) { payMsg.textContent = 'Selecione um endereço de entrega.'; return; }

        const res = await fetch(`${API_BASE}/checkout/start`, {
          method:'POST', headers:{ 'Content-Type':'application/json', ...authHeader() },
          body: JSON.stringify({ items_cents, shipping_cents: Number(shipping_cents||0), discount_cents: Number(discount_cents||0), buyer, address_id: selectedAddressId })
        });
        if(!res.ok){ payMsg.textContent = 'Não foi possível iniciar o checkout.'; return; }
        const data = await res.json();
        if (data && data.init_point) {
          window.location.href = data.init_point;
        } else {
          payMsg.textContent = 'Falha ao iniciar pagamento.';
        }
      } catch(err){
        payMsg.textContent = 'Erro no pagamento.';
      }
    });
  }

  renderReview();
}

document.addEventListener('DOMContentLoaded', init);