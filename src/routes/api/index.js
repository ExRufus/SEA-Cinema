const api = require("express").Router();
const film = require("./film");
const transaction = require("./transaction");
const user = require("./user");

api.use("/", user);
api.use("/", film);
api.use("/", transaction);

module.exports = api;