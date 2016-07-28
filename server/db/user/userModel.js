const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  locations: [],
  points: {type: Number, default: 0},
});

const User = mongoose.model('User', userSchema);

// User.create({ 'username': 'Tyler' }, function(err, user) {
//   if (err) return handleError(err);
// });


module.exports = User;
