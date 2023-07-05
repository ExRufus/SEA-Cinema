const { Transaction, User, Film } = require('../../models');
const ClientError = require('../exceptions/ClientError');
const autoBind = require('auto-bind');
const { validateTransactionPayload } = require('../validator/transactions');

class TransactionController {
  constructor() {
    autoBind(this);
  }

  async postTransactionHandler(req, res) {
    try {
      const { userId, filmId, placeSeats } = await validateTransactionPayload.validateAsync(req.body);

      // Find the user by id
      const user = await User.findByPk(userId);

      // Find the film by id
      const film = await Film.findByPk(filmId);

      // Check if the user meets the age rating requirement for the film
      if (user.age < film.age_rating) {
        throw new ClientError('User does not meet the age rating requirement for this film.', 400);
      }

      const totalSeats = placeSeats.length;
      const ticketPrice = film.ticket_price * totalSeats;
      
      if (user.balance < ticketPrice) {
        throw new ClientError('Insufficient balance to purchase the ticket.', 400);
      }

      // Deduct the ticket price from the user's balance
      user.balance -= ticketPrice;
      await user.save();

      // Create transactions for each selected seat
      const transactions = [];
      for ( const placeSeat of placeSeats) {
        const transaction = await Transaction.create({
          userId: user.id,
          filmId: film.id,
          place_seat: placeSeat,
        });
        transactions.push(transaction)
      }

      // Return the transaction details
      return res.status(200).json({
        status: 'success',
        data: transaction,
      });
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).json({
          status: 'fail',
          message: error.message,
        });
      }

      // Server ERROR!
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Sorry, there was a server error.',
      });
    }
  }

  async getTransactionByIdHandler(req, res) {
    try {
      const { id } = req.params;
      const transactionDetails = await Transaction.findByPk(id);

      if (!transactionDetails) {
        return res.status(404).json({
          status: 'fail',
          message: 'Transaction not found.',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          transactionDetails
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Sorry, there was a server error.',
      });
    }
  }

  async deleteTransactionByIdHandler(req, res) {
    try {
      const { id } = req.params;
      const deleteTransaction = await Transaction.findByPk(id);

      if (!deleteTransaction) {
        return res.status(404).json({
          status: 'fail',
          message: 'Transaction not found.',
        });
      }

      await Transaction.destroy({
        where: {
          id: deleteTransaction.id,
        },
      });

      return res.status(200).json({
        status: 'success',
        message: 'Transaction deleted successfully.',
        data: deleteTransaction,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Sorry, there was a server error.',
      });
    }
  }
}

module.exports = TransactionController;