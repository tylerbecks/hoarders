var mongoose = require('mongoose');

var Token_Schema = mongoose.Schema({
  location: String,
  messages: [{message: String, username: String, createdAt: {type: Date, default: Date.now}}],
});

var Token = mongoose.model('Token', Token_Schema);

var User_Schema = mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', User_Schema);

module.exports = {
  Token: Token,
  User: User
}