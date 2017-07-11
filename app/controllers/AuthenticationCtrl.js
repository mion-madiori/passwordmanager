const _ = require('underscore');

class AuthenticationCtrl {

    constructor(data, userService) {
        this._data = data;
        this._userService = userService;
    }

    login(req, res) {
        res.render('authentication/login', this._data)
    }

    postlogin(req, res) {

        if(req.body.constructor === Object && Object.keys(req.body).length === 0 ){
            res.render('authentication/login', {
                message: 'All fields required'
            })
            return
        }

        if(req.body.password === ''){
            res.render('authentication/login', {
                message: 'All fields required'
            })
            return
        }

        res.render('authentication/login', {
            message: ''
        });
    }
}

module.exports = AuthenticationCtrl;