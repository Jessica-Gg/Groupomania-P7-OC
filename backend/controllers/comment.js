const Comment = require('../models/comment');
const fs = require('fs');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
  connectDB.query('SELECT * FROM commentaire', async (error, result) =>{
    if(error){
      console.log(error);
    }else{
      console.log(result)
    }
    res.send('Commentaires trouvés')
  //dbconnect
  });
 //getall
 };

//Afficher un commentaire
exports.getOneComment = (req, res, next) => {
  const token = req.headers.authorization.substr(6);
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.id;
  connectDB.query('SELECT * FROM commentaire WHERE id=?', [id], async (error, result) =>{
   if(error){
     console.log(error);
   }else{
     console.log(result)
   }
   res.send('Commentiare trouvé')
 //dbconnect
 });
//getone
};

//Créer un article
exports.createComment = (req, res, next) => {
  const {contenu, user_id, article_id} = req.body
  const datePost = new Date()
  connectDB.query('INSERT INTO commentaire SET ?',{contenu: contenu, date: datePost, user_id: user_id, article_id: article_id}, (error, result)=>{
    if(error){
      console.log(error);
    } else{
      console.log(result)
    }
    res.send('Nouveau commenaire créé')
});
  
};

//Modifier un article
exports.modifyComment = (req, res, next) => {
  const commentObject = req.file ?
    { 
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
        Comment.updateOne({_id: req.params.id}, {...commentObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Commentaire modifié avec succès !'}))
          .catch(error => res.status(400).json({error}));  
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.substr(6);
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.id;

  connectDB.query('SELECT id FROM commentaire WHERE id=?', [id], async(error, result) => {
    try {
      if (req.params.id == id) {
        connectDB.query('DELETE FROM commentaire WHERE id=?', [id], async(error, result) => {
          if(error){
            console.log(error);
          }else{
            console.log(result)
          }
          res.send('Commentaire supprimé')
      });
      }
  } catch { (error => {
      res.status(400).json({error: error});
      alert('Commentaire non supprimé')
    })
  }
//dbconnect
  })
};