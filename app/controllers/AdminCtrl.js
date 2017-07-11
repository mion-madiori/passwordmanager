class AdminCtrl{
    constructor(AuthenticationService, PasswordService){}

    postAdd(req, res){
        res.render('', {
            message: ''
        })
    }
}

module.exports = AdminCtrl