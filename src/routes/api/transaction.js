const TransactionController = require('../../controllers/transactionController');
const transaction = require('express').Router();

const transactionController = new TransactionController();

transaction.post('/transaction', transactionController.postTransactionHandler);
transaction.get('/transaction/:id', transactionController.getTransactionByIdHandler);
transaction.delete('/transaction/:id', transactionController.deleteTransactionByIdHandler);

module.exports = transaction;