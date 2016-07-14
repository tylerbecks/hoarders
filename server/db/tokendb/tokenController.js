var Token = require('./tokenModel.js');
var Promise = require('bluebird');

module.exports = {

  //function takes in array of lat and long and will query database to see if a token exists in that location
  //if it exists will return an array of messages from db, if not, will return null
  getLocationMessages: function(req, res) {
    var location = req.query.location;
    console.log('location ' , location);
    console.log('location ' , typeof location);
    Token.findOne({location: location}, function(err, tokenData) {
      return new Promise(function(resolve, reject) {
        !err ? resolve(tokenData) : reject(err);
      })
    }).then(function(tokenData) {
      console.log('tokenData ' , tokenData);
      !tokenData ? res.send(null) : res.send(tokenData.messages);
    })
  },

  //function takes in array of lat and long and will write a key (lat long array) value (empty array for messages) to db
  createToken: function(req, res) {
    // req.body.location
  console.log('createToken ' , req.query.location);

  },

  //function that inputs a {location: [long, lat], message: 'string'} object and pushes string into that token's messages array
  writeToToken: function(req, res) {
    // req.body.location
    // req.body.message
  console.log('writeToToken ' , req.query.location);
  console.log('writeToToken ' , req.query.message);

  },  
}