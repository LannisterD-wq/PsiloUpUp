window.PSILOUP = window.PSILOUP || {};

let productsMap = null;

async function fetchProducts() {
  if (productsMap) return productsMap;
  const products = await window.PSILOUP.api.get('/catalog/products');
  productsMap = new Map();
  products.forEach((product) => {
    productsMap.set(product.sku, product);
    productsMap.set(String(product.id), product);
  });
  return productsMap;
}

function getProductSync(key) {
  if (!productsMap) return null;
  return productsMap.get(key) || null;
}

window.PSILOUP.catalog = {
  fetchProducts,
  getProductSync,
};



