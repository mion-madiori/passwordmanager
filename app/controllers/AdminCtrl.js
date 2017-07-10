class AdminCtrl{
    constructor(){
        this._password = null;
    }
    postAdd(req, res){
        this._password = req.body.password;
        res.render('', {
            pass: req.body.password
        }) 
    }
}

module.exports = AdminCtrl