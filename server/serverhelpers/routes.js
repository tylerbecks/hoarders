const userController = require('../db/user/userController.js');
const treasureChestController = require('../db/treasureChest/treasureChestController.js');

module.exports = (socket) => {

  socket.on('getCoinsOnMap', () => {
    treasureChestController.getCoinsOnMap(socket);
  });

  socket.on('updateBankedCoins', (userObj) => {
    console.log('router', userObj);
    userController.updateBankedCoins(userObj.username, userObj.coins, socket)
  })

  socket.on('validateUserLogin', (userCredentials) => {
    userController.validateUserLogin(userCredentials.username, userCredentials.password, socket);
  });

  socket.on('validateUserSignup', (userCredentials) => {
    userController.validateUserSignup(userCredentials.username, userCredentials.password, socket);
  });

  socket.on('getBankedCoins', (userObj) => {
    userController.getBankedCoins(userObj.username, socket);
  });
};




  // socket.on('updateUserPoints', (userObj) => {
  //   userController.updateUserPoints(userObj.username, userObj.location, socket);
  // });

  // socket.on('getUserScore', (userObj) => {
  //   userController.getUserScore(userObj.username, socket);
  // });
  // socket.on('updateTreasureState', (location) => {
  //   treasureChestController.updateTreasureState(location, socket);
  // });
