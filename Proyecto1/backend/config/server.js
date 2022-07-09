require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use((err, req, res, next) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

module.exports = {
    app
}