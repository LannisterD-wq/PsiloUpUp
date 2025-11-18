const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const { ORDER_STATUS } = require('../config/constants');

const Order = sequelize.define(
  'Order',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    addressId: { type: DataTypes.INTEGER, allowNull: true, field: 'address_id' },
    status: {
      type: DataTypes.ENUM(...Object.values(ORDER_STATUS)),
      allowNull: false,
      defaultValue: ORDER_STATUS.PENDING,
    },
    subtotalCents: { type: DataTypes.INTEGER, allowNull: false, field: 'subtotal_cents' },
    shippingCents: { type: DataTypes.INTEGER, allowNull: false, field: 'shipping_cents', defaultValue: 0 },
    discountCents: { type: DataTypes.INTEGER, allowNull: false, field: 'discount_cents', defaultValue: 0 },
    totalCents: { type: DataTypes.INTEGER, allowNull: false, field: 'total_cents' },
    shippingCarrier: { type: DataTypes.STRING, field: 'shipping_carrier' },
    shippingService: { type: DataTypes.STRING, field: 'shipping_service' },
    shippingEstimateDays: { type: DataTypes.INTEGER, field: 'shipping_estimate_days' },
    shippingTracking: { type: DataTypes.STRING, field: 'shipping_tracking' },
    mercadoPagoPreferenceId: { type: DataTypes.STRING, field: 'mp_preference_id' },
    mercadoPagoOrderId: { type: DataTypes.STRING, field: 'mp_order_id' },
    paymentId: { type: DataTypes.STRING, field: 'payment_id' },
    paymentStatus: { type: DataTypes.STRING, field: 'payment_status' },
    installments: { type: DataTypes.INTEGER, field: 'installments' },
  },
  {
    tableName: 'orders',
    underscored: true,
  },
);

module.exports = Order;

