const { Product, Coupon } = require('../models');

async function seedProducts() {
  const count = await Product.count();
  if (count > 0) {
    return;
  }
  await Product.bulkCreate([
    {
      sku: 'UP-MIND',
      name: 'UP MIND - Neuro Performance',
      description: 'Suplemento para foco e performance cognitiva.',
      priceCents: 17900,
      weightGrams: 150,
      heightCm: 12,
      widthCm: 8,
      lengthCm: 8,
      stockQuantity: 100,
      imageUrl: '/images/MIND.png',
    },
    {
      sku: 'UP-BURN',
      name: 'UP BURN - Energia & Metabolismo',
      description: 'Suplemento para energia e metabolismo acelerado.',
      priceCents: 17900,
      weightGrams: 150,
      heightCm: 12,
      widthCm: 8,
      lengthCm: 8,
      stockQuantity: 100,
      imageUrl: '/images/BURN.png',
    },
    {
      sku: 'STACK-DUPLO',
      name: 'Stack Duplo - UP MIND + UP BURN',
      description: 'Combo completo com UP Mind e UP Burn.',
      priceCents: 32200,
      weightGrams: 300,
      heightCm: 14,
      widthCm: 16,
      lengthCm: 10,
      stockQuantity: 50,
      imageUrl: '/images/Stack_Duplo.png',
    },
  ]);
}

async function seedCoupons() {
  const coupon = await Coupon.findOne({ where: { code: 'PSILO10' } });
  if (!coupon) {
    await Coupon.create({
      code: 'PSILO10',
      type: 'percent',
      value: 10,
      minimumCartCents: 10000,
    });
  }
}

async function runSeeds() {
  await seedProducts();
  await seedCoupons();
}

module.exports = {
  runSeeds,
};

