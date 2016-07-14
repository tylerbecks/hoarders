var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//middleware decorator
module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser({urlencoded: true}))
}