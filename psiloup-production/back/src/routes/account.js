const { Router } = require('express');
const AccountController = require('../controllers/AccountController');
const { authRequired } = require('../middleware/auth');

const router = Router();

router.use(authRequired);

router.get('/addresses', AccountController.listAddresses);
router.post('/addresses', AccountController.createAddress);
router.put('/addresses/:id', AccountController.updateAddress);
router.delete('/addresses/:id', AccountController.deleteAddress);

router.get('/orders', AccountController.listOrders);

module.exports = router;



