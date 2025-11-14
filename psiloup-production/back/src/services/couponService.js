const { Op } = require('sequelize');
const { Coupon } = require('../models');

async function findActiveCoupon(code) {
  if (!code) return null;
  const now = new Date();
  const coupon = await Coupon.findOne({
    where: {
      code: code.trim().toUpperCase(),
      active: true,
      [Op.or]: [{ validFrom: null }, { validFrom: { [Op.lte]: now } }],
      [Op.or]: [{ validUntil: null }, { validUntil: { [Op.gte]: now } }],
    },
  });
  return coupon;
}

function computeDiscount(coupon, subtotalCents) {
  if (!coupon) return 0;
  if (coupon.minimumCartCents && subtotalCents < coupon.minimumCartCents) {
    return 0;
  }
  if (coupon.type === 'percent') {
    const raw = Math.floor((subtotalCents * coupon.value) / 100);
    if (coupon.maxDiscountCents) {
      return Math.min(raw, coupon.maxDiscountCents);
    }
    return raw;
  }
  if (coupon.type === 'fixed') {
    return Math.min(subtotalCents, coupon.value);
  }
  return 0;
}

module.exports = {
  findActiveCoupon,
  computeDiscount,
};



