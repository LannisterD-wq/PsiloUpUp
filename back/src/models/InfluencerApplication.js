const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const InfluencerApplication = sequelize.define(
  'InfluencerApplication',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    whatsapp: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    instagram: { type: DataTypes.STRING, allowNull: false },
    followers: { type: DataTypes.INTEGER, allowNull: false },
    story: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: 'influencer_applications',
    underscored: true,
  },
)

module.exports = InfluencerApplication

