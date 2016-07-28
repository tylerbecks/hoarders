const treasureChest = require('./treasureChestModel.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

	updateTreasureState: (location, socket) => {
		var newLocA = location.substring(0, 6);
		var newLocB = location.substring(7, 15);
		var newLoc = String(newLocA) + String(newLocB);

		treasureChest.findOne( {location} ), (err, treasureData) => {
			if (treasureData) {
				socket.emit('updateTreasureState', true);
			}

			socet.emit('updateTreasureState', false);
		}
	}
}