const shippingService = require('../services/shippingService');
const { sanitizeCep } = require('../utils/validation');

async function quote(req, res) {
  try {
    const destinationCep = sanitizeCep(req.body.cep || req.body.to_cep);
    const items = Array.isArray(req.body.items)
      ? req.body.items
      : Array.isArray(req.body.items_cents)
      ? req.body.items_cents
      : [];
    if (!destinationCep || destinationCep.length !== 8) {
      return res.status(400).json({ error: 'CEP inválido.' });
    }
    if (!items.length) {
      return res.status(400).json({ error: 'Itens do carrinho ausentes.' });
    }
    const result = await shippingService.quote({ destinationCep, items });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao calcular frete.' });
  }
}

module.exports = {
  quote,
};



