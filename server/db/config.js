var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Create a new key on the module.exports so server.js can access the connection property from db.
module.exports.connect = function() {
  mongoose.connect('mongodb://127.0.0.1:27017/crumbs2', function(err) {
    err ? console.log(err) : console.log('db connected');
  });
};
