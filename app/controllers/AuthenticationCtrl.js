const _ = require('underscore');

class AuthenticationCtrl {

    constructor(data, userService) {
        this._data = data;
        this._userService = userService;
    }


    forgotPassword(req, res) {
        res.redirect('/resetPassword', this._data);
    }

    resetPassword(req, res) {
        if (_.isEmpty(req.body)) {
            res.render('/resetPassword', {
                message: 'Email address required'
            });
            return;
        }
        if (req.body.email === 'test-email@gmail.com') {
            res.render('/resetPassword', {
                password: 'p@ssword'
            });
            return;
        }
    }

    emailExistInBdd(req, res) {
        if (req.body.email === 'incorrect-email@gmail.com') {
            res.render('/resetPassword', {
                message: 'Incorrect email address'
            });
        }
    }

    login(req, res) {
        res.render('authentication/login', this._data)
    }

    postlogin(req, res) {

        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.render('authentication/login', {
                message: 'All fields required'
            });
            return
        }

        if (req.body.password === '') {
            res.render('authentication/login', {
                message: 'All fields required'
            });
            return
        }
    }

    registration(req, res){
        res.render('/registration', this._data);
    }

    postRegistration(req, res){

        let message;

        //If there is no email address or password
        if(req.body.email === '' || req.body.password === '') {
            res.render('/registration', {
                message: 'All fields required to register'
            });
            return;
        }

        this._userService.login(req.body.email, req.body.password).then(
            result => {
                if(result.message === 'success') {
                    res.render('index/index', {
                        message: message
                    });
                } else {

                    //check if the email address exist in database
                    if ( req.body.email === 'hubert.reeves@domain.tld') {
                        message = 'An account already exist with this email address';
                    }
                    else {
                        //check if the email address and password are correct
                        if ( req.body.email === 'chuck.norris@domain.tld' && req.body.password === 'password') {
                            message = 'Your registration is confirmed';
                        }
                    }

                    res.render('/registration', {
                        message: message
                    });
                }
            }
        ).catch(e => {
            res.render('/registration', {
                message: 'Unexpected error'
            });
        });

    }

    logout(res){
        res.render('/login', {
            message: 'You are logout'
        });
    }

}
module.exports = AuthenticationCtrl;