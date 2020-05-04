const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { uuidv4 } = require('./helper-function/idGenerator')
require('dotenv').config();
const {
  } = require("./DB/queries");
  const pool = require("./DB/index");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json('Server is on');
  });



module.exports = app;
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))