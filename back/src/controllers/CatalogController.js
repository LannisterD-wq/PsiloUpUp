const { Product } = require('../models');

async function listProducts(req, res) {
  const products = await Product.findAll({
    where: { active: true },
    order: [['name', 'ASC']],
  });
  return res.json(products);
}

async function getProduct(req, res) {
  const product = await Product.findOne({ where: { sku: req.params.sku, active: true } });
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado.' });
  }
  return res.json(product);
}

module.exports = {
  listProducts,
  getProduct,
};

