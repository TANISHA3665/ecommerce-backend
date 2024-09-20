const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Product = require('./product.model');

class CartItem extends Model {}

CartItem.init({
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
}, {
  sequelize,
  modelName: 'CartItem',
});

module.exports = CartItem;
