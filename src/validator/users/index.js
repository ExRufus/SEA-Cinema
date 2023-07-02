const InvariantError = require("../../exceptions/InvariantError");
const { UserPayloadSchema } = require("./schema");

module.exports = {
  validateUserPayload: (payload) => {
    const allowedFields = ['username', 'password', 'name', 'age', 'balance'];
    const validationResult = UserPayloadSchema.validate(payload, { allowUnknown: false, presence: 'required', keys: allowedFields });

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};