const UserController = require("../../controllers/usersController");
const user = require('express').Router();

const userController = new UserController();

user.post('/users', userController.postUserHandler)
user.get('/users', userController.getAllUsersHandler)
user.get('/users/:id', userController.getUserByIdHandler)

module.exports = user;