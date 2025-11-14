const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define(
  'Product',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    priceCents: { type: DataTypes.INTEGER, allowNull: false, field: 'price_cents' },
    weightGrams: { type: DataTypes.INTEGER, allowNull: false, field: 'weight_grams', defaultValue: 500 },
    lengthCm: { type: DataTypes.INTEGER, allowNull: false, field: 'length_cm', defaultValue: 20 },
    widthCm: { type: DataTypes.INTEGER, allowNull: false, field: 'width_cm', defaultValue: 15 },
    heightCm: { type: DataTypes.INTEGER, allowNull: false, field: 'height_cm', defaultValue: 10 },
    imageUrl: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    stockQuantity: { type: DataTypes.INTEGER, field: 'stock_quantity', defaultValue: 0 },
    stockManaged: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'stock_managed' },
  },
  {
    tableName: 'products',
    underscored: true,
  },
);

module.exports = Product;

