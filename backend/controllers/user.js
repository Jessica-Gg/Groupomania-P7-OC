const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../connect/db')

exports.signup = (req, res, next) => {
  const { firstname, lastname, email, password, admin } = req.body;
  if (!email || !password || !firstname || !lastname) {
    throw new WrongDataError("Tous les champs ne sont pas rempli")
  }
  connectDB.query('SELECT email FROM user WHERE email =?', [email], async (error, result) => {
    //console.log(result)
    if (error) {
      throw new WrongDataError('wrong email adress')
    }
    const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexEmail.test(email)) {
      if (result.length > 0) {
        throw new WrongDataError('email already used');
      } else {
        let hashedPassword = await bcrypt.hash(password, 10)
        connectDB.query('INSERT INTO user SET ?', { firstname: firstname, lastname: lastname, email: email, password: hashedPassword, admin: '0' }, (error, result) => {
          if (error) {
            throw new Error(error);
          } else {
            console.log(result)
          }
          res.send('Nouvel utilisateur créé')
        });
      }
    } else {
      throw new WrongDataError('wrong email');
    }
  })
};

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new WrongDataError("Tous les champs ne sont pas remplis")
    }
    connectDB.query('SELECT * FROM user WHERE email = ?', [email], async (error, result) => {
      if (result.length == 0) {
        throw new WrongDataError('wrong email adress');
      }
      if (!(bcrypt.compare(password, result[0].password))) {
        throw new WrongDataError('wrong password')
      }
      const id = result[0].id;
      res.status(200).json({
        id: id,
        token: jwt.sign(
          { id: id },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
      })
    })
  } catch (error) {
    throw new Error(error);
  }
}

exports.me = (req, res, next) => {
  try {
    const id = res.locals.userId;
    connectDB.query('SELECT * FROM user WHERE id = ?', [id], async (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res.send(result);
      }
    });
  } catch {
    throw new NotAllowedError('user not allowed');
  }
}

//Récupérer un'e seul'e utilisateur'ice
exports.getOneUser = (req, res, next) => {
  const id = res.locals.userId;
  connectDB.query('SELECT * FROM user WHERE id = ?', [id], async (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result)
    }
  });
};

//Afficher toustes les utilisateur'ices
exports.getAllUser = (req, res, next) => {
  connectDB.query('SELECT * FROM user ', async (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result)
    }
  });
};

//Modifier un'e utilisateur'ice
exports.modifyUser = (req, res, next) => {
  const id = res.locals.userId;
  const newDescription = req.body.description;
  connectDB.query('UPDATE user SET description=? WHERE id=?', [newDescription, id], async (error, result) => {
    if (error) {
      throw new Error(error);
    } else if (result.affectedRows < 1) {
      throw new NotFoundError('this user does not exist');
    } else {
      res.send('user updated');
    }
  });
}

//Supprimer un'e utilisateur'ice
exports.deleteUser = (req, res, next) => {
  const id = res.locals.userId;
  connectDB.query('DELETE FROM user WHERE id=?', [id], async (error, result) => {
    if (error) {
      throw new Error(error);
    } else if (result.affectedRows < 1) {
      throw new NotFoundError('this user does not exist');
    } else {
      res.send('user deleted');
    }
  });
};

//Supprimer un'e utilisateur'ice
exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  connectDB.query('DELETE FROM user WHERE id=?', [id], async (error, result) => {
    if (error) {
      throw new Error(error);
    } else if (result.affectedRows < 1) {
      throw new NotFoundError('this user does not exist');
    } else {
      res.send('user deleted');
    }
  });
};