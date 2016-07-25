const socketHandlers = require('../db/tokendb/socketHandlers.js');

module.exports = (socket) => {
  socket.on('updateMessagesState', (location) => {
    socketHandlers.updateMessagesState(location, socket);
  });

  socket.on('createChatRoom', (location) => {
    socketHandlers.createChatRoom(location, socket);
  });

  socket.on('addMessageToChatRoom', (msgObj) => {
    socketHandlers.addMessageToChatRoom(msgObj.location, msgObj.message, msgObj.username, socket);
  });

  socket.on('validateUserLogin', (userCredentials) => {
    socketHandlers.validateUserLogin(userCredentials.username, userCredentials.password, socket);
  });

  socket.on('validateUserSignup', (userCredentials) => {
    socketHandlers.validateUserSignup(userCredentials.username, userCredentials.password, socket);
  });
};
