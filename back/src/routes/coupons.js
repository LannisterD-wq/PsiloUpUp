const { Router } = require('express');
const CouponController = require('../controllers/CouponController');

const router = Router();

router.post('/validate', CouponController.validate);

module.exports = router;

