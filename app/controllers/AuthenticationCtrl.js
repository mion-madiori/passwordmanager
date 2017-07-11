const _ = require('underscore');

class AuthenticationCtrl {

    constructor(data, userService) {

    }

    login(req, res) {
        res.render('', this._data)
    }

    postlogin(req, res) {
        res.render('', {
            message: ''
        });
    }
}

module.exports = AuthenticationCtrl;