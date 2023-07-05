'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: 'userId' });
      Transaction.belongsTo(models.Film, { foreignKey: 'filmId' });
    }
  }

  Transaction.init({
    userId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE,
    place_seat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  
  return Transaction;
};