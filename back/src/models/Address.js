const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Address = sequelize.define(
  'Address',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    label: { type: DataTypes.STRING, defaultValue: 'Entrega' },
    recipientName: { type: DataTypes.STRING },
    street: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING },
    complement: { type: DataTypes.STRING },
    neighborhood: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING(2), allowNull: false },
    cep: { type: DataTypes.STRING(8), allowNull: false },
    default: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: 'addresses',
    underscored: true,
  },
);

module.exports = Address;

