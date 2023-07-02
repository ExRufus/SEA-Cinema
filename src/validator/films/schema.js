const Joi = require('joi');

const FilmPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  age_rating: Joi.number().integer().required(),
  poster_url: Joi.string().required(),
  ticket_price: Joi.number().integer().required()
});

module.exports = { FilmPayloadSchema };