const { Router } = require('express')
const PaymentController = require('../controllers/PaymentController')

const router = Router()

router.post('/webhook', PaymentController.mercadoPagoWebhook)

module.exports = router

