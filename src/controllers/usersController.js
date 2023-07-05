const { User } = require('../../models');
const ClientError = require('../exceptions/ClientError');
const { validateUserPayload } = require('../validator/users/index');
const autoBind = require('auto-bind');

class UserController {
  constructor() {
    autoBind(this);
  }

  async postUserHandler(req, res) {
    try {
      validateUserPayload(req.body);
      const createdUser = await User.create(req.body);

      return res.status(200).json({
        message: 'success',
        data: createdUser,
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
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
    }
  }

  async getAllUsersHandler(req, res) {
    const users = await User.findAll();

    return res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  };

  async getUserByIdHandler(req, res) {
    try {
      const { id } = req.params;

      const findUser = await User.findByPk(id);
      return res.status(200).json({
        status: 'success',
        data: {
          user: findUser,
        },
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
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
    }
  }

  async putBalanceByIdHandler(req, res) {
    try {
      const { id } = req.params;
      const { balance } = req.body;
  
      const user = await User.findByPk(id);
  
      const MAX_WITHDRAWAL = 500000;

      if (balance > MAX_WITHDRAWAL) {
        throw new ClientError(`The maximum balance that can be withdrawn is ${MAX_WITHDRAWAL}.`, 400);
      };

      if (balance > user.balance) {
        throw new ClientError('Insufficient balance.', 400);
      }

      user.balance -= balance;
      await user.save();

      const updateUser = await User.update(
        { balance },
        { returning: true, where: { id } }
      );
  
      return res.status(200).json({
        status: 'success',
        data: {
          updateUser,
        },
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
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
    }
  }
}

module.exports = UserController;
