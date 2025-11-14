const axios = require('axios');
const config = require('../config/env');

async function createPreference({ items, payer }) {
  if (!config.mercadoPago.accessToken) {
    throw new Error('Configuração Mercado Pago ausente.');
  }
  const payload = {
    items,
    back_urls: config.mercadoPago.backUrls,
    auto_return: 'approved',
  };
  if (payer && payer.email) {
    payload.payer = {
      email: payer.email,
      name: payer.name,
      identification: payer.cpf
        ? {
            type: 'CPF',
            number: payer.cpf,
          }
        : undefined,
    };
  }
  const response = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
    headers: {
      Authorization: `Bearer ${config.mercadoPago.accessToken}`,
      'Content-Type': 'application/json',
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

