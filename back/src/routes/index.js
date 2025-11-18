const { Router } = require('express');
const authRoutes = require('./auth');
const accountRoutes = require('./account');
const catalogRoutes = require('./catalog');
const checkoutRoutes = require('./checkout');
const shippingRoutes = require('./shipping');
const couponRoutes = require('./coupons');
const paymentRoutes = require('./payment');

const router = Router();

router.use('/auth', authRoutes);
router.use('/account', accountRoutes);
router.use('/catalog', catalogRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/shipping', shippingRoutes);
router.use('/coupons', couponRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;

