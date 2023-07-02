const InvariantError = require("../../exceptions/InvariantError");
const { FilmPayloadSchema } = require("./schema");

module.exports = {
  validateFilmPayload: (payload) => {
    const allowedFields = ['title', 'description', 'age_rating', 'poster_url', 'ticket_price'];
    const validationResult = FilmPayloadSchema.validate(payload, { allowUnknown: false, presence: 'required', keys: allowedFields });
  
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};