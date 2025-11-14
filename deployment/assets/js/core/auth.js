window.PSILOUP = window.PSILOUP || {};

(function authModule() {
  const { storageKeys } = window.PSILOUP.config;

  function readJSON(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeJSON(key, value) {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getToken() {
    return localStorage.getItem(storageKeys.token) || null;
  }

  function saveSession({ token, user }) {
    if (token) {
      localStorage.setItem(storageKeys.token, token);
    }
    if (user) {
      writeJSON(storageKeys.user, user);
    }
  }

  function clearSession() {
    localStorage.removeItem(storageKeys.token);
    localStorage.removeItem(storageKeys.user);
  }

  function getUser() {
    return readJSON(storageKeys.user);
  }

  function isAuthenticated() {
    const token = getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) return true;
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  }

  window.PSILOUP.auth = {
    getToken,
    saveSession,
    clearSession,
    getUser,
    isAuthenticated,
  };
})();

