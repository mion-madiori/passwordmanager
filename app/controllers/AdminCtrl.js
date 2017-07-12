const _ = require('underscore');
class AdminCtrl{
    constructor(PasswordService){
        this._passwordService = PasswordService;
    }

    postAdd(req, res){
        if(_.isEmpty(req.body)
            || _.isEmpty(req.body.url)
            || _.isEmpty(req.body.login)
            || _.isEmpty(req.body.password)) {
            res.render('/admin', {
                message: 'All fields required'
            });
            return;
        }

        this._passwordService.save(req.body.login, req.body.password, req.body.url).then(
            result => {
                if(result.message === 'success') {
                    res.redirect('/admin');
                } else {
                    res.render('/admin', {
                        message: 'Bad credentials'
                    });
                }
            }
        ).catch(e => {
            res.render('/admin', {
                message: 'Unexpected error'
            });
        });
    }

    putAdd(req, res){
        if(_.isEmpty(req.body)
            || _.isEmpty(req.body.url)
            || _.isEmpty(req.body.login)
            || _.isEmpty(req.body.password)) {
            res.render('/admin', {
                message: 'All fields are required'
            });
            return;
        }

        this._passwordService.save(req.body.login, req.body.password, req.body.url).then(
            result => {
                if(result.message === 'success') {
                    res.redirect('/admin');
                } else {
                    res.render('/admin', {
                        message: 'Bad credentials'
                    });
                }
            }
        ).catch(e => {
            res.render('/admin', {
                message: 'Unexpected error'
            });
        });
    }
}

module.exports = AdminCtrl;