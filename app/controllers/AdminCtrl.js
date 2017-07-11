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
            res.render('admin/listAdmin', {
                message: 'All fields required'
            });
            return;
        }

        this._passwordService.postAdd(req.body.url, req.body.password, req.body.password).then(
            result => {
                if(result.message === 'success') {
                    res.redirect('/admin');
                } else {
                    res.render('admin/listAdmin', {
                        message: 'Bad credentials'
                    });
                }
            }
        ).catch(e => {
            res.render('admin/listAdmin', {
                message: 'Unexpected error'
            });
        });
    }
}

module.exports = AdminCtrl;