var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var indexRoutes = require('./routes/app.routes');
const IndexCtrl = require('./app/controllers/IndexCtrl');

app.set('views', path.join(__dirname, 'app/views'));
// app.use(express.static(__dirname + '/app/views'))

app.set('view engine', "html");

app.use(express.static(path.join(__dirname, 'app/views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexCtrl = new IndexCtrl()

console.log(indexCtrl.goToRoute())
app.use('/', indexCtrl.goToRoute())

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
