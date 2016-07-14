// GET (get messages)
// url: /
// data out: {lat_long string}
// data returned: [array of messages] or undefined

// POST (create new room)
// url: /
// data out: {lat_long string}

// PUT (add message to room)
// url: /
// data out: {message, lat_long string}

var Token = require('./tokenModel.js');



module.exports = {

  //function takes in array of lat and long and will query database to see if a token exists in that location
  //if it exists will return an array of messages from db, if not, will return null
  getLocationMessages: function(locationArray) {

  },

  //function takes in array of lat and long and will write a key (lat long array) value (empty array for messages) to db
  createToken: function(locationArray) {

  },

  //function that inputs a {location: [long, lat], message: 'string'} object and pushes string into that token's messages array
  writeToToken: function() {

  },  
}