const connectDB = require('../connect/db');

//Afficher tous les commentaires
exports.getAllComment = (req, res, next) => {
  const articleId = req.params.id
  connectDB.query('SELECT c.*, u.lastname, u.firstname FROM commentaire c INNER JOIN user u ON c.user_id = u.id WHERE article_id=? ORDER BY date DESC', [articleId], async (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result)
      res.send(result)
    }
    //dbconnect
  });
  //getall
};

//Créer un article
exports.createComment = (req, res, next) => {
  const { contenu, user_id, article_id } = req.body
  const datePost = new Date()
  connectDB.query('INSERT INTO commentaire SET ?', { date: datePost, contenu: contenu, user_id: user_id, article_id: article_id }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result)
      res.send(result)
    }
  });
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  const commentId = req.params.id;
  connectDB.query('DELETE FROM commentaire WHERE id=?', [commentId], async(error, result) => {
    if(error){
      console.error(error);
      res.status(500).send("failed to delete comment");
    }else if(result.affectedRows < 1){
      res.status(404).send('ce commentaire n’existe pas');
    } else {
      res.send('commentaire supprimé');
    }
  });
};