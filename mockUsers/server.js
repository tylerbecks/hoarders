var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

var location = {}
location.lat = 37.999;
location.lon = -122.999;

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname));

app.post('/location', function(req, res) {
  location.lat = Number(req.body.location.lat)
  location.lon = Number(req.body.location.lon)
  res.send(location);
})

app.get('/demo', function(req, res) {
  res.send(location)
})

app.listen(8000, function(err) {
  !err ? console.log('Server running port 8000') : console.log('Server start error: ', err);
})