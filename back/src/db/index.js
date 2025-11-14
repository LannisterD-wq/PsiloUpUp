const { Sequelize } = require('sequelize');
const config = require('../config/env');

const sequelize = config.database.url
  ? new Sequelize(config.database.url, {
      logging: config.database.logging,
    })
  : new Sequelize({
      dialect: config.database.dialect,
      storage: config.database.storage,
      logging: config.database.logging,
    });

module.exports = sequelize;

