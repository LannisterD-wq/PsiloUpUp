document.addEventListener('DOMContentLoaded', () => {
  const ordersList = document.getElementById('orders-list');
  const addressesList = document.getElementById('addresses-list');
  const addressForm = document.getElementById('address-form');
  const logoutBtn = document.getElementById('logout');
  const profileInfo = document.getElementById('profile-info');
  const messageEl = document.getElementById('account-message');

  if (!window.PSILOUP.auth.isAuthenticated()) {
    if (messageEl) {
      messageEl.textContent = 'Faça login para acessar sua conta.';
      messageEl.className = 'error';
    }
    setTimeout(() => {
      window.location.href = 'login.html?redirect=account.html';
    }, 800);
    return;
  }

  function showMessage(target, message, type = 'info') {
    if (!target) return;
    target.textContent = message;
    target.className = type;
  }

  async function loadOrders() {
    if (!ordersList) return;
    showMessage(ordersList, 'Carregando pedidos...', 'info');
    try {
      const orders = await window.PSILOUP.api.get('/account/orders', { auth: true });
      if (!orders.length) {
        ordersList.innerHTML = '<p>Você ainda não possui pedidos.</p>';
        return;
      }
      const html = orders
        .map((order) => {
          const itemsHtml = (order.items || order.OrderItems || [])
            .map(
              (item) => `
              <li>${item.quantity}x ${item.title} — ${(item.unitPriceCents / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}</li>
            `,
            )
            .join('');
          const total = ((order.subtotalCents + order.shippingCents - order.discountCents) / 100).toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' },
          );
          return `
            <div class="order-card">
              <h4>Pedido #${order.id} — ${order.status}</h4>
              <p>Total: ${total}</p>
              ${order.shippingTracking ? `<p>Rastreio: ${order.shippingTracking}</p>` : ''}
              <ul>${itemsHtml}</ul>
            </div>
          `;
        })
        .join('');
      ordersList.innerHTML = html;
    } catch (error) {
      ordersList.innerHTML = '<p>Não foi possível carregar seus pedidos.</p>';
    }
  }

  async function loadAddresses() {
    if (!addressesList) return;
    addressesList.innerHTML = '<p>Carregando endereços...</p>';
    try {
      const addresses = await window.PSILOUP.api.get('/account/addresses', { auth: true });
      if (!addresses.length) {
        addressesList.innerHTML = '<p>Cadastre seu primeiro endereço abaixo.</p>';
        return;
      }
      addressesList.innerHTML = addresses
        .map(
          (address) => `
          <div class="address-card">
            <p>
              <strong>${address.label || 'Endereço'}</strong><br/>
              ${address.street}, ${address.number || 's/n'} ${address.complement || ''}<br/>
              ${address.neighborhood || ''}<br/>
              ${address.city} - ${address.state} | CEP: ${address.cep}
            </p>
            <button class="button small" data-delete="${address.id}">Excluir</button>
          </div>
        `,
        )
        .join('');
      addressesList.querySelectorAll('[data-delete]').forEach((button) => {
        button.addEventListener('click', async () => {
          const id = button.getAttribute('data-delete');
          await window.PSILOUP.api.delete(`/account/addresses/${id}`, { auth: true });
          loadAddresses();
        });
      });
    } catch (error) {
      addressesList.innerHTML = '<p>Não foi possível carregar seus endereços.</p>';
    }
  }

  if (addressForm) {
    addressForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const payload = {
        label: addressForm.querySelector('#addr-label')?.value,
        recipientName: addressForm.querySelector('#addr-recipient')?.value,
        street: addressForm.querySelector('#addr-street')?.value.trim(),
        number: addressForm.querySelector('#addr-number')?.value.trim(),
        complement: addressForm.querySelector('#addr-complement')?.value.trim(),
        neighborhood: addressForm.querySelector('#addr-neighborhood')?.value.trim(),
        city: addressForm.querySelector('#addr-city')?.value.trim(),
        state: addressForm.querySelector('#addr-state')?.value.trim(),
        cep: (addressForm.querySelector('#addr-cep')?.value || '').replace(/\D/g, ''),
        default: addressForm.querySelector('#addr-default')?.checked,
      };
      try {
        await window.PSILOUP.api.post('/account/addresses', payload, { auth: true });
        addressForm.reset();
        showMessage(messageEl, 'Endereço salvo com sucesso.', 'success');
        loadAddresses();
      } catch (error) {
        showMessage(messageEl, error.message || 'Falha ao salvar endereço.', 'error');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.PSILOUP.auth.clearSession();
      window.location.href = 'login.html';
    });
  }

  const user = window.PSILOUP.auth.getUser();
  if (profileInfo && user) {
    profileInfo.innerHTML = `<p><strong>${user.name || 'Cliente PsiloUp'}</strong><br/>${user.email}</p>`;
  }

  loadOrders();
  loadAddresses();
});