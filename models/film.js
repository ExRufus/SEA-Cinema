'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    static associate(models) {
      Film.hasMany(models.Transaction, { foreignKey: 'filmId' });
    }
  }

  Film.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    release_date: DataTypes.DATEONLY,
    age_rating: DataTypes.INTEGER,
    poster_url: DataTypes.STRING,
    ticket_price: DataTypes.DECIMAL
  }, 
  {
    sequelize,
    modelName: 'Film',
  });
  
  return Film;
};