var mongoose = require('mongoose');

var Token_Schema = mongoose.Schema({
  location: [Number],
  messages: [String],
});

var Token = mongoose.model('Token', Token_Schema);

var testData1 = new Token({
  location: ['41.25', '-120.97'],
  messages: ['testdata1'],
}).save((err, data) => {
  err ? console.log('testData1 save error', err) : console.log('testData1 save success', data);
});

var testData2 = new Token({
  location: [41.25, -120.97],
  messages: ['testdata2'],
}).save((err, data) => {
  err ? console.log('testData2 save error', err) : console.log('testData2 save success', data);
});

module.exports = Token;