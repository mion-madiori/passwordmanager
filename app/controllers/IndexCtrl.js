var express = require('express');
var router = express.Router();

class IndexCtrl{

    constructor(){
        
    }

    goToRoute(){
        return router.get('/', this.toIndex);
    }

    toIndex(req, res){
        res.render('index', { title: 'Express' });
    }
}

module.exports = IndexCtrl;