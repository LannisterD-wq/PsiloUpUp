document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginMessage = document.getElementById('login-message');
  const registerMessage = document.getElementById('register-message');

  function showMessage(el, message, type = 'info') {
    if (!el) return;
    el.textContent = message;
    el.className = type;
  }

  async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('#login-email')?.value.trim();
    const password = form.querySelector('#login-password')?.value;
    if (!email || !password) {
      showMessage(loginMessage, 'Informe e-mail e senha.', 'error');
      return;
    }
    try {
      const data = await window.PSILOUP.api.post('/auth/login', { email, password });
      window.PSILOUP.auth.saveSession(data);
      showMessage(loginMessage, 'Login realizado com sucesso!', 'success');
      const redirect = new URLSearchParams(window.location.search).get('redirect') || 'account.html';
      setTimeout(() => {
        window.location.href = redirect;
      }, 400);
    } catch (error) {
      showMessage(loginMessage, error.message || 'Falha no login.', 'error');
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      name: form.querySelector('#reg-name')?.value.trim(),
      email: form.querySelector('#reg-email')?.value.trim(),
      phone: form.querySelector('#reg-phone')?.value.trim(),
      cpf: (form.querySelector('#reg-cpf')?.value || '').replace(/\D/g, ''),
      password: form.querySelector('#reg-password')?.value,
    };
    const password2 = form.querySelector('#reg-password2')?.value;
    if (!payload.name || !payload.email || !payload.password) {
      showMessage(registerMessage, 'Preencha nome, e-mail e senha.', 'error');
      return;
    }
    if (payload.password !== password2) {
      showMessage(registerMessage, 'As senhas não conferem.', 'error');
      return;
    }
    try {
      const data = await window.PSILOUP.api.post('/auth/register', payload);
      window.PSILOUP.auth.saveSession(data);
      showMessage(registerMessage, 'Cadastro realizado com sucesso!', 'success');
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 400);
    } catch (error) {
      showMessage(registerMessage, error.message || 'Falha no cadastro.', 'error');
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});