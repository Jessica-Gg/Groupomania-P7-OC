const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./connect/db');

//const userRoutes = require('./routes/user');
//const articleRoutes = require('./routes/article');

const app = express();

//Headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Conversion en JSON
app.use(bodyParser.json());

//Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/auth/', userRoutes);
//app.use('/api/auth/', articleRoutes);

app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/users/new', function(req, res){
  db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
});

module.exports = app;

