const connectDB = require('../connect/db');

//Créer un article
exports.createArticle = (req, res, next) => {
  const user_id = res.locals.userId;
  const { contenu } = req.body
  let image;
  if (req.file == null) {
    image = null
  } else {
    image = `/images/${req.file.filename}`
  }
  const datePost = new Date()
  connectDB.query('INSERT INTO article SET ?', { image: image, contenu: contenu, date: datePost, user_id: user_id }, (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result)
    }
  });
};

//Afficher tous les articles
exports.getAllArticle = (req, res, next) => {
  connectDB.query('SELECT a.*, u.lastname, u.firstname FROM article a INNER JOIN user u ON a.user_id = u.id ORDER BY date DESC',
   async (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result)
    }
  });
};

//Afficher un article
exports.getOneArticle = (req, res, next) => {
  const id = req.params.id;
  connectDB.query('SELECT * FROM article WHERE id=?', [id], async (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      console.log(result)
    }
    res.send('post found')
  });
};

//Supprimer un article
exports.deleteArticle = (req, res, next) => {
  const postId = req.params.id;
  connectDB.query('DELETE FROM article WHERE id=?', [postId], async (error, result) => {
    if (error) {
      throw new Error(error);
    } else if (result.affectedRows < 1) {
      throw new NotFoundError('this post does not exist');
    } else {
      res.send('post deleted');
    }
  });
};