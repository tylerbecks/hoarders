var mongoose = require('mongoose');

var Token_Schema = mongoose.Schema({
  location: [Number],
  messages: [String],
});

var Token = mongoose.model('Token', Token_Schema);

var matt = new Token({
  location: [1, 5],
  messages: 'Hellllo',
}).save((err, data) => {
  err ? console.log('error') : console.log(data);
});

module.exports = Token;