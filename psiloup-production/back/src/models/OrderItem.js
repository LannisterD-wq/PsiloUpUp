const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const OrderItem = sequelize.define(
  'OrderItem',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false, field: 'order_id' },
    productId: { type: DataTypes.INTEGER, allowNull: true, field: 'product_id' },
    title: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPriceCents: { type: DataTypes.INTEGER, allowNull: false, field: 'unit_price_cents' },
    weightGrams: { type: DataTypes.INTEGER, field: 'weight_grams', defaultValue: 0 },
  },
  {
    tableName: 'order_items',
    underscored: true,
  },
);

module.exports = OrderItem;



