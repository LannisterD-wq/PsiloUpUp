const couponService = require('../services/couponService');

async function validate(req, res) {
  try {
    const code = String(req.body.code || '').trim().toUpperCase();
    if (!code) {
      return res.status(400).json({ error: 'Informe um cupom.' });
    }
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const subtotalCents = Number(
      req.body.subtotal_cents ||
        items.reduce((sum, item) => sum + Number(item.price_cents || item.cents || 0) * Number(item.qty || 1), 0),
    );
    const coupon = await couponService.findActiveCoupon(code);
    const discountCents = couponService.computeDiscount(coupon, subtotalCents);
    return res.json({
      valid: discountCents > 0,
      discount_cents: discountCents,
      label: coupon ? `${coupon.type === 'percent' ? coupon.value + '% OFF' : 'Desconto'}` : '',
    });
  } catch (error) {
    return res.status(400).json({ error: 'Falha ao validar cupom.' });
  }
}

module.exports = {
  validate,
};



