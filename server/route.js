const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { uuidv4 } = require('./helper-function/idGenerator')
require('dotenv').config();
const {
    categories,
    productInfo
  } = require("./DB/queries");
const pool = require("./DB/index");
const dir = path.join(__dirname, '/images/');
imagesName = ['amningssjalar', 'babynest', 'barnklader', 'filtar', 'mossor', 'pannband', 'tygkasar', 'yogapasar'];

app.use(express.static(dir));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/', async (req, res) => {
    const DBdata = await pool.query(categories());
    res.json(DBdata.rows);
  });

app.get('/products/:product', async (req, res) => {
  const product = req.params.product;
  console.log(product)
  const DBdata = await pool.query(productInfo(product))
  res.json(DBdata.rows);
  });

imagesName.map(item => app.get(`/images/${item}`, (req, res) => {
  res.sendFile(`${dir}/${item}.jpg`);
  }));

module.exports = app;
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}!`))