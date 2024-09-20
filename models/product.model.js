const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');  // Import the User model

class Product extends Model {}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,  // Association with User model
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Product',
  timestamps: true,  // Ensures createdAt and updatedAt fields are managed automatically
});

// Ensure the association between Product and User exists
Product.belongsTo(User, { foreignKey: 'userId' });

module.exports = Product;
