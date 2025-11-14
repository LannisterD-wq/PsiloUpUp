const { Router } = require('express');
const CatalogController = require('../controllers/CatalogController');

const router = Router();

router.get('/products', CatalogController.listProducts);
router.get('/products/:sku', CatalogController.getProduct);

module.exports = router;



