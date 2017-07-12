var express = require('express');
var router = express.Router();

class IndexCtrl{

    constructor(){
        
    }

    getRoute(){
        return router.get('/', function(req, res, next) {
            res.render('index', { title: 'Express' });
        });
    }
}

module.exports = IndexCtrl;