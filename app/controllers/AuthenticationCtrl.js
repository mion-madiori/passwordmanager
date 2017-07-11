const _ = require('underscore');

class AuthenticationCtrl {

    constructor(data, userService) {

    }

    loginAction(req, res) {
        res.render('', this._data)
    }

    login(req, res) {
        res.render('', {
            message: ''
        });
    }
}

module.exports = AuthenticationCtrl;