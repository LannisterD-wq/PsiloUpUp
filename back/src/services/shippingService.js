const axios = require('axios');
const config = require('../config/env');
const { Product } = require('../models');

async function mapCartItems(items) {
  const mapped = [];
  for (const item of items) {
    const qty = Number(item.qty || item.quantity || 1);
    if (!qty || qty < 1) continue;
    let product = null;
    if (item.productId) {
      product = await Product.findByPk(item.productId);
    } else if (item.id) {
      const maybeId = Number(item.id);
      if (!Number.isNaN(maybeId) && Number.isFinite(maybeId)) {
        product = await Product.findByPk(maybeId);
      }
      if (!product) {
        product = await Product.findOne({ where: { sku: item.id } });
      }
    } else if (item.sku) {
      product = await Product.findOne({ where: { sku: item.sku } });
    }
    if (product) {
      mapped.push({
        id: product.id,
        sku: product.sku,
        price_cents: Number(item.price_cents ?? item.cents ?? product.priceCents),
        qty,
        weight_grams: product.weightGrams,
        height_cm: product.heightCm,
        width_cm: product.widthCm,
        length_cm: product.lengthCm,
      });
    } else {
      mapped.push({
        price_cents: Number(item.price_cents ?? item.cents ?? 0),
        qty,
        weight_grams: Number(item.weight_grams ?? item.weight ?? config.shipping.defaultPackage.weight * 1000),
        height_cm: Number(item.height_cm ?? item.height ?? config.shipping.defaultPackage.height),
        width_cm: Number(item.width_cm ?? item.width ?? config.shipping.defaultPackage.width),
        length_cm: Number(item.length_cm ?? item.length ?? config.shipping.defaultPackage.length),
      });
    }
  }
  return mapped;
}

async function getMelhorEnvioQuote({ destinationCep, items }) {
  if (!config.shipping.melhorEnvioToken) {
    return null;
  }
  const products = [];
  for (const item of items) {
    for (let i = 0; i < item.qty; i += 1) {
      products.push({
        height: item.height_cm,
        width: item.width_cm,
        length: item.length_cm,
        weight: item.weight_grams / 1000,
      });
    }
  }
  if (!products.length) {
    products.push({
      height: config.shipping.defaultPackage.height,
      width: config.shipping.defaultPackage.width,
      length: config.shipping.defaultPackage.length,
      weight: config.shipping.defaultPackage.weight,
    });
  }
  try {
    const response = await axios.post(
      'https://api.melhorenvio.com.br/v2/calculator',
      {
        from: { postal_code: config.shipping.originCep },
        to: { postal_code: destinationCep },
        products,
      },
      {
        headers: {
          Authorization: `Bearer ${config.shipping.melhorEnvioToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 15000,
      },
    );
    const servicesRaw = response.data?.services || [];
    const services = servicesRaw
      .map((service) => ({
        carrier: String(service.carrier || ''),
        name: String(service.name || ''),
        price_cents: Math.round(Number(service.price || 0) * 100),
        delivery_time_days: Number(service.delivery_time || 0),
        company: String(service.company || ''),
      }))
      .filter((service) => Number.isFinite(service.price_cents) && service.price_cents >= 0);
    if (services.length) {
      return { source: 'melhorenvio', services };
    }
  } catch (error) {
    return null;
  }
  return null;
}

function calculateFallback({ items, destinationCep }) {
  const subtotalCents = items.reduce((acc, item) => acc + Number(item.price_cents || 0) * Number(item.qty || 1), 0);
  const totalWeightGrams = items.reduce((acc, item) => acc + Number(item.weight_grams || 0) * Number(item.qty || 1), 0);
  const base = config.shipping.flatShippingCents;
  const free = subtotalCents >= config.shipping.freeShippingThresholdCents;

  if (free) {
    return {
      source: 'fallback',
      cost_cents: 0,
      free: true,
      threshold_cents: config.shipping.freeShippingThresholdCents,
      services: [
        {
          carrier: 'Correios',
          name: 'Frete Grátis',
          price_cents: 0,
          delivery_time_days: 5,
        },
      ],
    };
  }

  // Simple heuristic: adjust cost by weight and CEP region
  const weightKg = Math.max(1, Math.ceil(totalWeightGrams / 1000));
  const regionMultiplier = destinationCep.startsWith(config.shipping.originCep.slice(0, 3)) ? 1 : 1.35;
  const cost = Math.round(base * weightKg * regionMultiplier);

  return {
    source: 'fallback',
    cost_cents: cost,
    free: false,
    threshold_cents: config.shipping.freeShippingThresholdCents,
    weight_grams: totalWeightGrams,
    services: [
      {
        carrier: 'Correios',
        name: 'Padrão',
        price_cents: cost,
        delivery_time_days: 5,
      },
    ],
  };
}

async function getSuperFreteQuote({ destinationCep, items }) {
  const { token, endpoint, customerId } = config.shipping.superfrete || {}
  if (!token) return null

  // Explicit SuperFrete endpoint or configured fallback
  const url = endpoint || null
  if (!url) return null

  // Build payload following SuperFrete docs: from/to/services/options + products
  const subtotalCents = items.reduce((acc, i) => acc + Number(i.price_cents || 0) * Number(i.qty || 1), 0)
  const payload = {
    from: { postal_code: config.shipping.originCep },
    to: { postal_code: destinationCep },
    services: config.shipping.superfrete.services || '1,2,17',
    options: {
      own_hand: false,
      receipt: false,
      insurance_value: Math.round(subtotalCents) / 100,
      use_insurance_value: !!config.shipping.superfrete.useInsurance,
    },
    products: items.map((i) => ({
      quantity: Number(i.qty || 1),
      height: Math.max(1, Number(i.height_cm || config.shipping.defaultPackage.height)),
      width: Math.max(1, Number(i.width_cm || config.shipping.defaultPackage.width)),
      length: Math.max(1, Number(i.length_cm || config.shipping.defaultPackage.length)),
      weight: Math.max(0.01, Number(i.weight_grams || config.shipping.defaultPackage.weight * 1000) / 1000),
    })),
  }

  try {
    const resp = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': config.shipping.superfrete.userAgent },
      timeout: 15000,
    })
    const quotes = resp.data?.quotes || resp.data?.services || []
    const services = quotes
      .map((q) => ({
        carrier: String(q.name || q.carrier || ''),
        name: String(q.service || q.name || ''),
        price_cents: Math.round(Number(q.price || q.cost || 0) * 100),
        delivery_time_days: Number(q.days || q.delivery_time || 0),
      }))
      .filter((s) => Number.isFinite(s.price_cents) && s.price_cents >= 0)
    if (services.length) {
      return { source: 'superfrete', services }
    }
  } catch (e) {
    return null
  }
  return null
}

async function quote({ destinationCep, items: rawItems }) {
  const items = await mapCartItems(rawItems);
  if (!items.length) {
    throw new Error('Itens inválidos');
  }
  const superFrete = await getSuperFreteQuote({ destinationCep, items });
  if (superFrete) return superFrete;
  const melhorEnvio = await getMelhorEnvioQuote({ destinationCep, items });
  if (melhorEnvio) return melhorEnvio;
  return calculateFallback({ destinationCep, items });
}

module.exports = {
  quote,
};

