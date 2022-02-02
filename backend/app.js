const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./connect/db');
const morgan = require('morgan')

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');

const app = express();

//Headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Package pour afficher un log de toutes les requêtes envoyées.
app.use(morgan('combined'))

//Conversion en JSON
app.use(bodyParser.json());

//Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes des utilisateurs, articles et commentaires
app.use('/user', userRoutes);
app.use('/posts', articleRoutes);
app.use('/comment', commentRoutes);

//Tests de routes via Postman
//pp.get('/', function(req, res) {
// res.send('hello world');
//);

module.exports = app;

