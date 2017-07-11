const _ = require('underscore');

class AuthenticationCtrl {

    constructor (data, userService) {
        this._data = data;
        this._userService = userService;
    }

    forgotPassword(req, res){
        res.redirect('/resetPassword', this._data);
    }

    resetPassword(req, res){
        if(_.isEmpty(req.body)) {
            res.render('/resetPassword', {
                message: 'Email address required'
            });
            return;
        }
        if(req.body.email === 'test-email@gmail.com') {
            res.render('/resetPassword', {
               password: 'p@ssword'
            });
            return;
        }
    }

    emailExistInBdd(req, res){
        if(req.body.email === 'incorrect-email@gmail.com') {
            res.render('/resetPassword', {
                message: 'Incorrect email address'
            });
        }
    }
}

module.exports = AuthenticationCtrl;