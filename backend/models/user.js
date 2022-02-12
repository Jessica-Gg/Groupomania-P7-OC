class User {
    constructor(user) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.description = user.description;
    }
}

module.export = User;