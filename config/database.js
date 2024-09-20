const { Sequelize } = require('sequelize');
const { dbHost, dbUser, dbPassword, dbName, dbPort } = require('./dotenv');

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
