const Comment = require('../models/comment');
const connectDB = require('../connect/db');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
  console.log('getallComments')
  const articleId = req.params.id
  console.log('articleId', articleId)
  connectDB.query('SELECT * FROM commentaire WHERE article_id=? ORDER BY date DESC ', [articleId], async (error, result) =>{
    if(error){
      console.log(error);
    }else{
      console.log(result)
      res.send(result)
    }   
  //dbconnect
  });
 //getall
 };

//Créer un article
exports.createComment = (req, res, next) => {
  const {contenu, user_id, article_id, auteuriceLastname, auteuriceFirstname} = req.body
  const datePost = new Date()
  connectDB.query('INSERT INTO commentaire SET ?',{date: datePost, contenu: contenu, user_id: user_id, article_id: article_id, auteuriceLastname: auteuriceLastname, auteuriceFirstname: auteuriceFirstname}, (error, result)=>{
    if(error){
      console.log(error);
    } else{
      console.log(result)
      res.send(result)
    }
});
  
};

//Modifier un commentaire
exports.modifyComment = (req, res, next) => {
  const {id, contenu} = req.body;
  connectDB.query('SELECT id FROM commentaire WHERE id=?', [id], async(error, result) => {
    try {
      if (req.body.id == id) {
        connectDB.query('UPDATE commentaire SET contenu=? WHERE id=?', [contenu, id], async(error, result) => {
          if(error){
            console.log(error);
          }else{
            console.log(result)
            res.status(200).json({ message: "Commentaire mis à jour" });
          }
      });
      }
  } catch { (error => {
      res.status(400).json({error: error});
      alert('Commentaire non modifié')
    })
  }
});
}; //modify

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  console.log('delete comment')
  const commentId = req.params.id;
  console.log(commentId)

  connectDB.query('SELECT id FROM commentaire WHERE id=?', [commentId], async(error, result) => {
    try {
      if (req.params.id == commentId) {
        connectDB.query('DELETE FROM commentaire WHERE id=?', [commentId], async(error, result) => {
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