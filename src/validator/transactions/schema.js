const Joi = require('joi');

const TransactionPayloadSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  filmId: Joi.number().integer().min(1).required(),
  placeSeats: Joi.array()
    .items(Joi.number().integer().min(1).max(64))
    .min(1)
    .required(),
});

module.exports = TransactionPayloadSchema;