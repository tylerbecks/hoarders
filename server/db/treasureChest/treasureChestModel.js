const mongoose = require('mongoose');

const treasureSchema = mongoose.Schema({
	location: String,
});

const TreasureChest = mongoose.model('TresureChest', treasureSchema);

// TreasureChest.create({ location: '37.7849-122.4075' });
// TreasureChest.create({ location: '37.7851-122.4093' });
// TreasureChest.create({ location: '37.7829-122.4101' });
// TreasureChest.create({ location: '37.7829-122.4079' });
// TreasureChest.create({ location: '37.7837-122.4090' });

module.exports = TreasureChest;
