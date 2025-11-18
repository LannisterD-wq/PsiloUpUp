const sequelize = require('../db');
const User = require('./User');
const Address = require('./Address');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Coupon = require('./Coupon');
const InfluencerApplication = require('./InfluencerApplication');

User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Address.hasMany(Order, { foreignKey: 'address_id', as: 'orders' });
Order.belongsTo(Address, { foreignKey: 'address_id', as: 'address' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
  sequelize,
  User,
  Address,
  Product,
  Order,
  OrderItem,
  Coupon,
  InfluencerApplication,
};

