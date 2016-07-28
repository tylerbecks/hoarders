const chatroomController = require('../db/chatroom/chatroomController.js');
const userController = require('../db/user/userController.js');
const treasureChestController = require('../db/treasureChest/treasureChestController.js');

module.exports = (socket) => {
  socket.on('updateTreasureState', (location) => {
    treasureChestController.updateTreasureState(location, socket);
  });

  socket.on('validateUserLogin', (userCredentials) => {
    userController.validateUserLogin(userCredentials.username, userCredentials.password, socket);
  });

  socket.on('validateUserSignup', (userCredentials) => {
    userController.validateUserSignup(userCredentials.username, userCredentials.password, socket);
  });

  socket.on('updateUserPoints', (userObj) => {
    userController.updateUserPoints(userObj.username, userObj.location);
  });
};