var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')

//middleware decorator
module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
}