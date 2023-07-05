const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(7)
    .max(15)
    .required(),
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  age: Joi.number()
    .integer()
    .max(80)
    .required(),
  balance: Joi.number()
    .positive()
    .allow(0)
    .required()
});

module.exports = { UserPayloadSchema };
