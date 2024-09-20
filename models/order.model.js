const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Product = require('./product.model');

class Order extends Model {}

Order.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Product, key: 'id' },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isPaymentMade: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'Order',
});

module.exports = Order;
