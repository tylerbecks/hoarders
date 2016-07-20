var Token = require('./tokenModel.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  
  //function takes in array of lat and long and will query database to see if a token exists in that location
  //if it exists will return an array of messages from db, if not, will return null
  getLocationMessages: function(location, socket) {
    Token.findOne({location: location}, function(err, tokenData) {
      socket.emit('setLocation', tokenData)
    })
  },

  //function takes in array of lat and long and will write a key (lat long array) value (empty array for messages) to db
  createToken: function(req, res) {
    var location = req.body.location;
    new Token({
      location: location,
      messages: [],
    }).save((err, data) => {
      return new Promise((resolve, reject) => {
        !err ? resolve(data) : reject(err); 
      })
    }).then((data) => {
      socket.emit('setLocation', tokenData)
    }).catch((err) => {
      console.log('createToken data failed to save to database', err)
    })
  },

  //function that inputs a {location: [long, lat], message: 'string'} object and pushes string into that token's messages array
  writeToToken: function(req, res) {
    var location = req.body.location;
    var message = req.body.message;
    var tokenDataReturn = {};
    Token.findOne({location: location}, function(err, tokenData) {
      var newMessages = tokenData.messages;
      newMessages.unshift(message);
      tokenDataReturn.messages = newMessages;
      Token.update({location: location}, {messages: newMessages}, function(err, dataBaseResponse) {
        !err ? res.send(tokenDataReturn) : console.log('failed to put message', err)
      })
    })  
  },  
}