const userModel = require('../models/UserModel');

class AuthenticationService{

    constructor(UserModel){}

    registration(email, password){}

    login(email, password){}

    update(email, lastPassword, newPassword){}
}

module.exports = AuthenticationService;