const mongoose = require('mongoose'); 

const treasureSchema = mongoose.Schema({ 
	location: String,
});

const TreasureChest = mongoose.model('TresureChest', treasureSchema);

module.exports = TreasureChest;

//TreasureChest.create({location: '37.791-122.409'});