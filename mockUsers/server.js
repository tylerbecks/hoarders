var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname));


var location = {}
location.lat = 37.999;
location.lon = -122.999;

io.on('connection', function (socket) {
  socket.on('locationUpdate', function (data) {
    location.lat = Number(data.lat)
    location.lon = Number(data.lon)
  });
});

app.get('/demo', function(req, res) {
  res.send(location)
})

server.listen(8000, function(err) {
  !err ? console.log('Server running port 8000') : console.log('Server start error: ', err);
})




