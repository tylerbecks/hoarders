var express = require('express');
var location = require('./app');

var app = express();

app.get('/', function(req, res) {
  //res.send({lat: x, lon: y})
})

app.listen(8000, function(err) {
  !err ? console.log('Server running port 8000') : console.log('Server start error: ', err);
})