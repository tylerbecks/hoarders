const Chatroom = require('./chatroomModel.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


module.exports = {
  // takes in array of lat and long and will query database to see if a token exists in that location
  //if it exists will return an array of messages from db, if not, will return null
  updateMessagesState: (location, socket) => {
    console.log('checking to see if there is any treasure at: ', location )
    var newLocA = location.substring(0, 6);
    var newLocB = location.substring(7, 15);
    var newLoc = String(newLocA) + String(newLocB);
    console.log('newLoc is: ',newLoc)
    if (newLoc === '37.785-122.409') {
      console.log("BBBBBBOOOOOOOOOM!!!!!!! Here is your token, mofo.")
      socket.emit('updateMessagesState', 'YOU GOT A WINNER, HOMBRE!!!')
    }
    // Chatroom.findOne({ location }, (err, tokenData) => {
    //   socket.emit('updateMessagesState', tokenData);
    // });
  }

  // takes in array of lat and long and will write a key (lat long array) value (empty array for messages) to db
  // createChatRoom: (location, socket) => {
  //   Chatroom.create({
  //     location,
  //     messages: [],
  //   }).then((data) => {
  //     socket.emit('updateMessagesState', data);
  //   }).catch((err) => {
  //     console.log('createToken data failed to save to database', err);
  //   });
  // },

  // // that inputs a {location: [long, lat], message: 'string'} object and pushes string into that token's messages array
  // addMessageToChatRoom: (location, message, username, socket) => {
  //   var tokenDataReturn = {};
  //   Chatroom.findOne({ location }, (err, tokenData) => {
  //     tokenDataReturn = tokenData;
  //     var newMessages = tokenData.messages;
  //     newMessages.unshift({ message, username });
  //     tokenDataReturn.messages = newMessages;
  //     Chatroom.update({ location }, { messages: newMessages }, (err, dataBaseResponse) => {
  //       socket.emit('updateMessagesState', tokenDataReturn);
  //     });
  //   });
  // },
};

