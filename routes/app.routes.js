var express = require('express');
var router = express.Router()

var path = require('path');

router.get('/index', function (req, res) {
//   res.sendFile(path.join(__dirname+'/app/views/index.html'));
res.sendFile('/index.html');
  // res.render(path.join(__dirname+'/app/views/index.html')); 
} )

module.exports = router