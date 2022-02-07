const Article = require('../models/article');
const connectDB = require('../connect/db');
const jwt = require('jsonwebtoken');


//Créer un article
exports.createArticle = (req, res, next) => {
  const {contenu, user_id, auteuriceLastname, auteuriceFirstname} = req.body
  let image;
 if(req.file == null){
   image = null
 }else {
   image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
 }
  const datePost = new Date()
  connectDB.query('INSERT INTO article SET ?',{image: image, contenu: contenu, date: datePost, user_id: user_id, auteuriceLastname: auteuriceLastname, auteuriceFirstname: auteuriceFirstname }, (error, result)=>{
    if(error){
      console.log(error);
    } else{
      console.log(result)
      res.send(result)
    }
    //res.send('Nouvelle publication créée')
});
  
};

//Afficher tous les articles
exports.getAllArticle = (req, res, next) => {
  connectDB.query('SELECT * FROM article ORDER BY date DESC', async (error, result) =>{
   if(error){
     console.log(error);
   }else{
    // console.log(result)
     res.send(result)
   }
 //dbconnect
 });
//getall
};

//Afficher un article
exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  connectDB.query('SELECT * FROM article WHERE id=?', [id], async (error, result) =>{
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
  const postId = req.params.id;

  connectDB.query('SELECT id FROM article WHERE id=?', [postId], async(error, result) => {
    try {
      if (req.params.id == postId) {
        connectDB.query('DELETE FROM article WHERE id=?', [postId], async(error, result) => {
          if(error){
            console.log(error);
          }else{
            console.log(result)
            connectDB.query('DELETE FROM commentaire WHERE article_id=?', [postId], async(error, result) => {
              if(error){
                console.log(error);
              }else{
                console.log(result)
              }}
            );
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