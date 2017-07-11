const _ = require('underscore');

class AuthenticationCtrl {

    constructor (data, userService) {

    }

    forgotPassword(req, res){
        res.redirect('', this._data);
    }

    resetPassword(req, res){
        res.render('/resetPassword', undefined);
    }

    emailExistInBdd(req, res){
        res.render('/resetPassword', undefined);
    }
}

module.exports = AuthenticationCtrl;