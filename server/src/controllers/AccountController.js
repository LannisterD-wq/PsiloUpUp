const { Op } = require('sequelize');
const { Address, Order } = require('../models');
const { ensureFields } = require('../utils/validation');

async function listAddresses(req, res) {
  const addresses = await Address.findAll({
    where: { userId: req.user.id },
    order: [['default', 'DESC'], ['id', 'DESC']],
  });
  return res.json(addresses);
}

async function createAddress(req, res) {
  const required = ensureFields(req.body, ['street', 'city', 'state', 'cep']);
  if (required.length) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  const { label, recipientName, street, number, complement, neighborhood, city, state, cep, default: isDefault } =
    req.body;
  const STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RO','RS','RR','SC','SE','SP','TO'];
  const uf = String(state || '').toUpperCase();
  const cepSanitized = String(cep).replace(/\D/g, '').slice(0, 8);
  if (!STATES.includes(uf)) {
    return res.status(400).json({ error: 'UF inválida.' });
  }
  if (!cepSanitized || cepSanitized.length !== 8) {
    return res.status(400).json({ error: 'CEP inválido.' });
  }
  const address = await Address.create({
    userId: req.user.id,
    label,
    recipientName,
    street,
    number,
    complement,
    neighborhood,
    city,
    state: uf,
    cep: cepSanitized,
    default: Boolean(isDefault),
  });
  if (isDefault) {
    await Address.update({ default: false }, { where: { userId: req.user.id, id: { [Op.ne]: address.id } } });
    await address.update({ default: true });
  }
  return res.status(201).json(address);
}

async function updateAddress(req, res) {
  const address = await Address.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!address) {
    return res.status(404).json({ error: 'Endereço não encontrado.' });
  }
  const updates = { ...req.body };
  if (updates.cep) {
    updates.cep = String(updates.cep).replace(/\D/g, '').slice(0, 8);
  }
  await address.update(updates);
  if (updates.default) {
    await Address.update({ default: false }, { where: { userId: req.user.id, id: { [Op.ne]: address.id } } });
  }
  return res.json(address);
}

async function deleteAddress(req, res) {
  const address = await Address.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!address) {
    return res.status(404).json({ error: 'Endereço não encontrado.' });
  }
  await address.destroy();
  return res.json({ ok: true });
}

async function listOrders(req, res) {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: ['items', 'address'],
    order: [['id', 'DESC']],
  });
  return res.json(orders);
}

module.exports = {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  listOrders,
};

