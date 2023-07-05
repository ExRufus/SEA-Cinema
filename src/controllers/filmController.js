const { Film } = require('../../models'); 
const ClientError = require("../exceptions/ClientError");
const { validateFilmPayload } = require("../validator/films");
const autoBind = require('auto-bind');

class FilmController {
  constructor() {
    autoBind(this);
  }

  async postFilmHandler(req, res) {
    try {
      validateFilmPayload(req.body);
      const createFilm = await Film.create(req.body);

      return res.status(200).json({
        status: 'success',
        data: createFilm,
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

  async getAllFilmsHandler(req, res) {
    try {
      const films = await Film.findAll();
      
      // const formattedFilms = films.map(film => {
      //   return {
      //     id: film.id,
      //     title: film.title,
      //     description: film.description,
      //     release_date: film.release_date,
      //     poster_url: film.poster_url,
      //     age_rating: film.age_rating,
      //     ticket_price: film.ticket_price
      //   };
      // });
  
      return res.status(200).json({
        status: 'success',
        data: films,
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

module.exports = FilmController;