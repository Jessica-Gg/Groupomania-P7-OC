const Article = require('../models/article');
const fs = require('fs');
const connectDB = require('../connect/db');

//Créer un article
exports.createArticle = (req, res, next) => {
  const {image, contenu, user_id} = req.body
  console.log('createArticle')
  if(req.body.image == null){
    req.body.image = null
  }else {
    req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  const datePost = new Date()
  connectDB.query('INSERT INTO article SET ?',{image: image, contenu: contenu, date: datePost, user_id: user_id}, (error, result)=>{
    if(error){
      console.log(error);
    } else{
      console.log(result)
    }
    res.send('Nouvelle piblication créée')
});
  
};

//Afficher tous les articles
exports.getAllArticle = (req, res, next) => {
  connectDB.query('SELECT * FROM article', async (error, result) =>{
   if(error){
     console.log(error);
   }else{
     console.log(result)
   }
   res.send('Articles trouvés')
 //dbconnect
 });
//getall
};

//Afficher un article
exports.getOneArticle = (req, res, next) => {
  const token = req.headers.authorization.substr(6);
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.id;
  connectDB.query('SELECT * FROM article WHERE postId=?', [id], async (error, result) =>{
   if(error){
     console.log(error);
   }else{
     console.log(result)
   }
   res.send('Article trouvé')
 //dbconnect
 });
//getone
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
  const token = req.headers.authorization.substr(6);
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const id = decodedToken.postId;

  connectDB.query('SELECT id FROM article WHERE postId=?', [id], async(error, result) => {
    try {
      if (req.params.id == id) {
        connectDB.query('DELETE FROM article WHERE postId=?', [id], async(error, result) => {
          if(error){
            console.log(error);
          }else{
            console.log(result)
          }
          res.send('Article supprimé')
      });
      }
  } catch { (error => {
      res.status(400).json({error: error});
      alert('Article non supprimé')
    })
  }
//dbconnect
  })
};