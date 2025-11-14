window.PSILOUP = window.PSILOUP || {};

const DEFAULT_API_BASE =
  typeof window.PSILOUP_API_BASE === 'string' && window.PSILOUP_API_BASE.length
    ? window.PSILOUP_API_BASE.replace(/\/+$/g, '')
    : `${window.location.origin.replace(/\/+$/g, '')}/api`;

window.PSILOUP.config = {
  apiBase: DEFAULT_API_BASE,
  storageKeys: {
    token: 'psiloup_token',
    user: 'psiloup_user',
    cart: 'psiloup_cart_v2',
    coupon: 'psiloup_coupon_v1',
  },
};



