var express = require('express');
// var mongoose = require('mongoose');

var app = express();

app.listen(3000, function(err) {
  err ? console.log('server error', err) : console.log('server running port 3000')
})
