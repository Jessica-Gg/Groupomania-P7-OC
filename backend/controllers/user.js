const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../connect/db')

exports.signup = (req, res, next) => {
  const {firstname, lastname, email, password, admin} = req.body;
  if(!email || !password || !firstname || !lastname){
      return res.status(401).json({message:"Tous les champs ne sont pas remplit"})      
   }
  connectDB.query('SELECT email FROM user WHERE email =?',[email], async(error, result) =>{
      //console.log(result)
      if(error){
          console.log(error); 
          res.status(401).json({message:"erreur"})     
      }
      const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (regexEmail.test(email))
          {
             if(result.length > 0){ 
                  res.status(401).json({message:"Cette adresse mail est déjà utilisée"})
              }else{
                  let hashedPassword = await bcrypt.hash(password, 10)
                  connectDB.query('INSERT INTO user SET ?',{firstname: firstname, lastname: lastname, email: email, password: hashedPassword, admin:'0'}, (error, result)=>{
                      if(error){
                        console.log(error);
                      } else{
                        console.log(result)
                      }
                      res.send('Nouvel utilisateur créé')
                  });
              }
          }else{
             res.status(401).json({message:"Adresse mail incorrecte"})
          }  
  })
};

exports.login = (req, res, next) => {
  try{
    const {email, password} = req.body  
        if(!email ||!password){
            return res.status(401).json({message:"Tous les champs ne sont pas remplis"})      
         }        
          connectDB.query('SELECT * FROM user WHERE email = ?', [email], async (error, result) =>{
            if(result.length == 0){
            res.status(401).json({message:'Adresse mail incorrecte'})
            }
            if(!(bcrypt.compare(password, result[0].password) )){
            res.status(401).json({message:'Mot de passe incorrect'})
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
  }catch(error){
    console.log(error)
  }  
}

exports.me = (req, res, next) => {
    try {
      const id = res.locals.userId;
      connectDB.query('SELECT * FROM user WHERE id = ?', [id], async (error, result) =>{
        if(error){
          console.log(error);
          res.status(500).send("failed to get user");
        }else{
          console.log(result)
          res.send(result); 
        }
      });
    } catch {
        res.status(403)
    }
}

//Récupérer un'e seul'e utilisateur'ice
exports.getOneUser= (req, res, next) => { 
  console.log('plop',res.locals)
  const id = res.locals.userId;
  connectDB.query('SELECT * FROM user WHERE id = ?', [id], async (error, result) =>{
   if(error){
     console.log(error);
     res.status(500).send("failed to get user");
   }else{
     console.log(result)
     res.send(result)
   }
 //dbconnect
 });
//getone
};

//Afficher toustes les utilisateur'ices
exports.getAllUser = (req, res, next) => {
  connectDB.query('SELECT * FROM user ', async (error, result) =>{
   if(error){
     console.log(error);
     res.status(500).send("failed to get users");
   }else{
    // console.log(result)
     res.send(result)
   }
 //dbconnect
 });
//getall
};

//Modifier un'e utilisateur'ice
exports.modifyUser = (req,res, next)=>{
  const id = res.locals.userId;
  const newDescription = req.body.description;
  connectDB.query('UPDATE user SET description=? WHERE id=?', [newDescription, id], async(error, result) => {
    if(error){
      console.error(error);
      res.status(500).send("failed to update user");
    }else if(result.affectedRows < 1){
      res.status(404).send('this user does not exist');
    } else {
      res.send('user updated');
    }
  });
//modify
}

//Supprimer un'e utilisateur'ice
exports.deleteUser = (req, res, next) => {
  const id = res.locals.userId;
  connectDB.query('DELETE FROM user WHERE id=?', [id], async(error, result) => {
    if(error){
      console.error(error);
      res.status(500).send("failed to delete user");
    }else if(result.affectedRows < 1){
      res.status(404).send('this user does not exist');
    } else {
      res.send('user deleted');
    }
  });
//delete  
};