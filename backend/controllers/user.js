const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const connectDB = require('../connect/db')
const CryptoJS = require('crypto-js')

exports.signup = (req, res, next) => {
  const {firstname, lastname, email, password, admin} = req.body;
  if(!email ||!password || !firstname || !lastname){
      return res.status(401).json({message:"Tous les champs ne sont pas remplit"})      
   }
  //console.log(req.body.password)
  let cryptEmail = CryptoJS.AES.encrypt(email,  CryptoJS.enc.Hex.parse(process.env.KEY), { iv: CryptoJS.enc.Hex.parse(process.env.IV) }).toString();
  dbConnect.query('SELECT email FROM user WHERE email =?',[cryptEmail], async(error, result) =>{
      console.log(result)
      if(error){
          console.log(error); 
          res.status(401).json({message:"erreur"})     
      }
      const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          console.log(this.userInfos)
          if (regexEmail.test(email))
          {
             if(result.length > 0){ 
                  res.status(401).json({message:"Cette email est déjà utilisée"})
              }else{
                  let cryptEmail = CryptoJS.AES.encrypt(email,  CryptoJS.enc.Hex.parse(process.env.KEY), { iv: CryptoJS.enc.Hex.parse(process.env.IV) }).toString();
                  let hashedPassword = await bcrypt.hash(password, 10)
          
                  connectDB.query('INSERT INTO user SET ?',{firstname: firstname, lastname: lastname, email: cryptEmail, password: hashedPassword, admin:'0'}, (error, result)=>{
                      if(error){
                        console.log(error);
                      } else{
                        console.log(result)
                      }
                      res.send('envoyer')
                  });
              }
          }else{
             res.status(401).json({message:"Caractère spéciaux non autorisés"})
          }
      
  })

};

exports.login = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({error: 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({error: 'Mot de passe incorrect !'});
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {userId: user._id},
              'RANDOM_TOKEN_SECRET',
              {expiresIn: '24h'}
            )
          });
        })
        .catch(error => res.status(500).json({error}));
    })
  .catch(error => res.status(500).json({error}));
};