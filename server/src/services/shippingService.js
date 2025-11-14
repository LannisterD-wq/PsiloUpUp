const axios = require('axios');
const config = require('../config/env');
const { Product } = require('../models');

function parseMoney(val) {
  if (val === null || val === undefined) return NaN;
  if (typeof val === 'number') return val;
  const s = String(val).trim();
  const normalized = s.replace(/\./g, '').replace(/,/g, '.');
  return Number(normalized);
}

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

async function getSuperFreteQuote({ destinationCep, items }) {
  if (!config.shipping.superFrete || !config.shipping.superFrete.token) {
    return null;
  }
  const baseUrl = String(config.shipping.superFrete.baseUrl || '').replace(/\/$/, '');
  const url = `${baseUrl}/api/v0/calculator`;
  const products = items.map((item) => ({
    quantity: Number(item.qty || 1),
    weight: Number(item.weight_grams || 0) / 1000,
    height: Number(item.height_cm || config.shipping.defaultPackage.height),
    width: Number(item.width_cm || config.shipping.defaultPackage.width),
    length: Number(item.length_cm || config.shipping.defaultPackage.length),
  }));
  const payload = {
    from: { postal_code: String(config.shipping.originCep).replace(/\D/g, '').slice(0, 8) },
    to: { postal_code: String(destinationCep).replace(/\D/g, '').slice(0, 8) },
    services: String(config.shipping.superFrete.services || '1,2'),
    options: {
      own_hand: false,
      receipt: false,
      insurance_value: 0,
      use_insurance_value: false,
    },
    products,
  };
  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${config.shipping.superFrete.token}`,
        'User-Agent': String(config.shipping.superFrete.userAgent || 'PsiloUp (dev@psiloup.local)'),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });
    const data = response.data || {};
    const c1 = Array.isArray(data.results) ? data.results : [];
    const c2 = Array.isArray(data.services) ? data.services : [];
    const c3 = data.data && Array.isArray(data.data.results) ? data.data.results : [];
    const c4 = data.data && Array.isArray(data.data.services) ? data.data.services : [];
    const candidates = [...c1, ...c2, ...c3, ...c4];
    const services = candidates
      .map((s) => {
        const price = parseMoney(s.price ?? s.value ?? s.cost ?? 0);
        const deliveryDays = Number(s.delivery_time_days ?? s.delivery_time ?? s.deadline ?? s.days ?? 0);
        const name = String(s.name ?? s.service_name ?? '');
        const company = String(s.company ?? s.carrier ?? '');
        if (!Number.isFinite(price) || !(price > 0)) return null;
        return {
          carrier: company || 'Correios',
          name: name || (s.service_id === 2 ? 'SEDEX' : 'PAC'),
          price_cents: Math.round(price * 100),
          delivery_time_days: Number.isFinite(deliveryDays) && deliveryDays > 0 ? deliveryDays : undefined,
        };
      })
      .filter(Boolean);
    if (services.length) {
      return { services };
    }
    try {
      console.warn('[SuperFrete] Nenhum serviço válido retornado', JSON.stringify(data).slice(0, 1000));
    } catch (_) {}
  } catch (error) {
    try {
      console.error('[SuperFrete] Erro ao cotar', error && error.response ? error.response.data : error);
    } catch (_) {}
    return null;
  }
  return null;
}

// Sem fallback: somente SuperFrete quando configurado

async function quote({ destinationCep, items: rawItems }) {
  const items = await mapCartItems(rawItems);
  if (!items.length) {
    throw new Error('Itens inválidos');
  }
  if (config.shipping.superFrete && config.shipping.superFrete.token) {
    const superFrete = await getSuperFreteQuote({ destinationCep, items });
    return superFrete || { services: [] };
  }
  return { services: [] };
}

module.exports = {
  quote,
};

