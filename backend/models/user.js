const connectDB = require('../connect/db')

const User = function(user){
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.description = user.description;
}

module.export = User;