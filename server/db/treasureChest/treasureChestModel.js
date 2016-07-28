const mongoose = require('mongoose'); 

const treasureSchema = mongoose.Schema({ 
	location: String,
});

const TreasureChest = mongoose.model('TresureChest', treasureSchema);

module.exports = TresureChest;