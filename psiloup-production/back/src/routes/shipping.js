const { Router } = require('express');
const ShippingController = require('../controllers/ShippingController');

const router = Router();

router.post('/quote', ShippingController.quote);

module.exports = router;



