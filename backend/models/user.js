const connectDB = require('../connect/db')

const User = function(user){
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.description = user.description;
}

User.getOneUser = (id, result )=>{
    dbConnect.query('SELECT * FROM user WHERE id=?',id,(err,res)=>{
            if(err){
               // console.log('error  user',err);
                result(null, err);
            }else{
               // console.log(err)
                result(null,res);   
            }
    });
};

module.export = User;