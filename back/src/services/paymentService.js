const axios = require('axios');
const config = require('../config/env');

async function createPreference({ items, payer, externalReference }) {
  if (!config.mercadoPago.accessToken) {
    throw new Error('Configuração Mercado Pago ausente.');
  }
  // Ensure items have positive unit_price and non-zero quantity
  const safeItems = (items || [])
    .map((it) => ({
      title: it.title,
      quantity: Math.max(1, Number(it.quantity || 1)),
      currency_id: String(it.currency_id || 'BRL'),
      unit_price: Math.max(0.01, Number(it.unit_price || 0)),
    }))
    .filter((it) => Number.isFinite(it.unit_price) && it.unit_price > 0)

  const payload = {
    items: safeItems,
    back_urls: config.mercadoPago.backUrls,
    auto_return: 'approved',
    notification_url: config.mercadoPago.notificationUrl,
    external_reference: externalReference ? String(externalReference) : undefined,
  };
  if (payer && payer.email) {
    payload.payer = {
      email: payer.email,
      name: payer.name,
      identification: payer.cpf
        ? {
            type: 'CPF',
            number: String(payer.cpf).replace(/\D/g, ''),
          }
        : undefined,
    };
  }
  const response = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
    headers: {
      Authorization: `Bearer ${config.mercadoPago.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 15000,
  });
  const { init_point, sandbox_init_point, id } = response.data || {};
  return {
    initPoint: init_point || sandbox_init_point,
    preferenceId: id,
  };
}

module.exports = {
  createPreference,
};

