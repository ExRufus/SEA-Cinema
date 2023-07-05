const InvariantError = require("../../exceptions/InvariantError");
const TransactionPayloadSchema = require("./schema");

module.exports = {
  validateTransactionPayload: (payload) => {
    const validationResult = TransactionPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};