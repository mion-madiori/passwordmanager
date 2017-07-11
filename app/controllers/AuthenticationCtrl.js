/**
 * Created by Marie on 10/07/2017.
 */


class AuthenticationCtrl {

    constructor(data, userService) {
    }


    registration(req, res){
        res.render('', this._data);
    }

    postRegistration(req, res){
        res.render('', {
           message: ''
        });
    }

}
module.exports = AuthenticationCtrl;
