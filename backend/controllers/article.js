const Article = require('../models/article');
const fs = require('fs');
const {response} = require('express');
const connectDB = require('../connect/db');

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
  if(req.body.image == null){
    req.body.image = null
  }else {
    req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  
  const articleData = new Article(req.body);
  if(req.body.constructor === Object && Object.keys(req.body).lenght === 0){
    res.send(400).send({succes:false, message:'Merci de remplir au moins un champs'})
  }else{
    Article.createArticle(articleData,(err, article)=>{
        if(err)
          res.send(err);
          res.json({status: true, message: 'Nouvelle publication créée !', data: article})   
    })
}
};

//Modifier un article
exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
    { 
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        Article.updateOne({id: req.params.id}, {...articleObject, id: req.params.id})
          .then(() => res.status(200).json({message: 'Article modifié avec succès !'}))
          .catch(error => res.status(400).json({error}));  
};

//Supprimer un article
exports.deleteArticle = (req, res, next) => {
  Article.findOne({id: req.params.id})
    .then(Article => {
      const filename = Article.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          Article.deleteOne({id: req.params.id})
            .then(() => res.status(200).json({message: 'Article supprimé avec succès !'}))
            .catch(error => res.status(400).json({error}));
      });
    })
    .catch(error => res.status(500).json({error}));
};