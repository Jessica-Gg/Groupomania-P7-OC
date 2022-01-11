const Article = require('../models/article');
const fs = require('fs');
const {response} = require('express');

//Afficher tous les articles
exports.getAllArticle = (req, res, next) => {
  Article.find()
    .then(article => {
      res.status(200).json(article);
    })
    .catch(error => {
      res.status(400).json({error: error});
    });
};

//Afficher un article
exports.getOneArticle = (req, res, next) => {
  Article.findOne({_id: req.params.id})
    .then(article => {
      res.status(200).json(article);
      })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
};

//Créer un article
exports.createArticle = (req, res, next) => {
  const articleObject = JSON.parse(req.body.article);
  delete articleObject._id;
  const newArticle = new Article({
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
    newArticle.save()
      .then(() => res.status(201).json({message: 'Article enregistré avec succès !'}))
      .catch(error => res.status(400).json({error}));
};

//Modifier un article
exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
    { 
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        Article.updateOne({_id: req.params.id}, {...articleObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Article modifié avec succès !'}))
          .catch(error => res.status(400).json({error}));  
};

//Supprimer un article
exports.deleteArticle = (req, res, next) => {
  Article.findOne({_id: req.params.id})
    .then(Article => {
      const filename = Article.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          Article.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Article supprimé avec succès !'}))
            .catch(error => res.status(400).json({error}));
      });
    })
    .catch(error => res.status(500).json({error}));
};