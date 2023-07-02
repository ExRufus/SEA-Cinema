const { User } = require('../../models');
const ClientError = require('../exceptions/ClientError');
const { validateUserPayload } = require('./userValidator');

class UserController {
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

  async getUserHandler(res) {
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
}

module.exports = UserController;
