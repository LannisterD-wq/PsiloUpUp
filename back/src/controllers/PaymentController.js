const axios = require('axios')
const config = require('../config/env')
const { Order } = require('../models')

async function mercadoPagoWebhook(req, res) {
  try {
    const queryId = req.query && (req.query['id'] || req.query['data.id'])
    const bodyId = req.body && (req.body['id'] || (req.body.data && req.body.data.id))
    const id = String(queryId || bodyId || '')
    if (!id) {
      return res.status(200).json({ ok: true })
    }
    const resp = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: { Authorization: `Bearer ${config.mercadoPago.accessToken}` },
      timeout: 10000,
    })
    const payment = resp.data || {}
    const externalRef = payment.external_reference
    if (externalRef) {
      const order = await Order.findByPk(Number(externalRef))
      if (order) {
        await order.update({
          paymentId: String(payment.id || ''),
          paymentStatus: String(payment.status || ''),
          installments: Number(payment.installments || 0) || null,
        })
      }
    }
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(200).json({ ok: true })
  }
}

module.exports = { mercadoPagoWebhook }

