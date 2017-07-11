var express = require('express');
var path = require('path');
var app = express();
var indexRoutes = require('./routes/app.routes')
const IndexCtrl = require('./app/controllers/IndexCtrl')

app.set('views', path.join(__dirname, 'app/views'))
// app.use(express.static(__dirname + '/app/views'))

app.set('view engine', "html")

app.get('/', (req, res) => {
  index = new IndexCtrl(res, path)
})

app.get('/index', indexRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
