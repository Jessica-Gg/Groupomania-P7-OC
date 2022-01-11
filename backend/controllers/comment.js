const Comment = require('../models/comment');
const fs = require('fs');
const {response} = require('express');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
    Comment.find()
    .then(article => {
      res.status(200).json(article);
    })
    .catch(error => {
      res.status(400).json({error: error});
    });
};

//Afficher un article
exports.getOneComment = (req, res, next) => {
    Comment.findOne({_id: req.params.id})
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
exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.comment);
  delete commentObject._id;
  const newComment = new Comment({
    ...commentObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
    newComment.save()
      .then(() => res.status(201).json({message: 'Commentaire enregistré avec succès !'}))
      .catch(error => res.status(400).json({error}));
};

//Modifier un article
exports.modifyComment = (req, res, next) => {
  const commentObject = req.file ?
    { 
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        Comment.updateOne({_id: req.params.id}, {...articleObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Commentaire modifié avec succès !'}))
          .catch(error => res.status(400).json({error}));  
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({_id: req.params.id})
    .then(Comment => {
      const filename = Comment.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Comment.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Commentaire supprimé avec succès !'}))
            .catch(error => res.status(400).json({error}));
      });
    })
    .catch(error => res.status(500).json({error}));
};