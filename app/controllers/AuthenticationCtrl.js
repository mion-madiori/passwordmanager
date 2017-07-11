/**
 * Created by Marie on 10/07/2017.
 */

const _ = require('underscore');

class AuthenticationCtrl {

    constructor(data, userService) {
        this._data = data;
        this._userService = userService;
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

}
module.exports = AuthenticationCtrl;
