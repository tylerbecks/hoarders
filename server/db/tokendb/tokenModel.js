var mongoose = require('mongoose');

var Token_Schema = mongoose.Schema({
  location: String,
  messages: [{message: String, createdAt: {type: Date, default: Date.now}}],
});

var Token = mongoose.model('Token', Token_Schema);

module.exports = Token;