var express = require('express');

var app = express();



app.listen(8000, function(err) {
  !err ? console.log('Server running port 8000') : console.log('Server start error: ', err);
})