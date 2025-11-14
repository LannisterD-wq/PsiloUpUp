const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Coupon = sequelize.define(
  'Coupon',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    type: { type: DataTypes.ENUM('percent', 'fixed'), allowNull: false, defaultValue: 'percent' },
    value: { type: DataTypes.INTEGER, allowNull: false }, // percent (0-100) or cents
    maxDiscountCents: { type: DataTypes.INTEGER, field: 'max_discount_cents' },
    minimumCartCents: { type: DataTypes.INTEGER, field: 'minimum_cart_cents', defaultValue: 0 },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    validFrom: { type: DataTypes.DATE, field: 'valid_from' },
    validUntil: { type: DataTypes.DATE, field: 'valid_until' },
    usageLimit: { type: DataTypes.INTEGER, field: 'usage_limit' },
    usageCount: { type: DataTypes.INTEGER, field: 'usage_count', defaultValue: 0 },
  },
  {
    tableName: 'coupons',
    underscored: true,
  },
);

module.exports = Coupon;

