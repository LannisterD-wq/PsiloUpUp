window.PSILOUP = window.PSILOUP || {};

async function request(path, { method = 'GET', body, headers = {}, auth = false } = {}) {
  const { apiBase } = window.PSILOUP.config;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  if (auth) {
    const token = window.PSILOUP.auth.getToken();
    if (!token) {
      throw new Error('Sessão expirada.');
    }
    options.headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${apiBase}${path}`, options);
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();
  if (!response.ok) {
    const message = isJson ? data.error || data.message || 'Erro na requisição.' : 'Erro na requisição.';
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }
  return data;
}

window.PSILOUP.api = {
  request,
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts = {}) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts = {}) => request(path, { ...opts, method: 'PUT', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};



