const treasureChest = require('./treasureChestModel.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  getCoinsOnMap: (socket) => {
    treasureChest.find().then((coins) => {
      console.log(coins)
      socket.emit('getCoinsOnMap', coins);
    });
  },



	// updateTreasureState: (location, socket) => {
	// 	var newLocA = location.substring(0, 7);
	// 	var newLocB = location.substring(7, 17);
	// 	var newLoc = String(newLocA) + String(newLocB);
 //    console.log('update treasureChest: ', newLocA, newLocB)
 //    treasureChest.findOne({ 'location': newLoc }, (err, treasureData) => {
 //      if (treasureData) {
 //        socket.emit('updateTreasureState', treasureData);
 //      } else {
 //        socket.emit('updateTreasureState', false);
 //      }
 //    });
 //  },
};
