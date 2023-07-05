const FilmController = require("../../controllers/filmController");
const film = require('express').Router();

const filmController = new FilmController();

film.post('/films', filmController.postFilmHandler);
film.get('/films', filmController.getAllFilmsHandler);

module.exports = film;