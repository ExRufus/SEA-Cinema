require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server up on server http://localhost:${PORT}`);
});