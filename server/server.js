var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./serverhelpers/middleware.js');
var routers = require('./serverhelpers/routes.js');

var app = express();
var connection = mongoose.connect('mongodb://127.0.0.1:27017/tokens', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('db connected');
  }
});

middleware(app, express);
routers(app, express);

app.listen(3000, function(err) {
  err ? console.log('server error', err) : console.log('server running port 3000')
})
