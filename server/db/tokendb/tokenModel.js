var mongoose = require('mongoose');

var Token_Schema = mongoose.Schema({
  location: [Number],
  messages: [String],
});

var Token = mongoose.model('Token', Token_Schema);

module.exports = Token;