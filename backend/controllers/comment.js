const connectDB = require('../connect/db');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
  const articleId = req.params.id
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

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  const commentId = req.params.id;
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
    }catch { (error => {
      res.status(400).json({error: error});
      alert('Commentaire non supprimé')
    })
  }
//dbconnect
  })
};