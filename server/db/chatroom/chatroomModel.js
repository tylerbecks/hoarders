const mongoose = require('mongoose');

const chatroomSchema = mongoose.Schema({
  location: String,
  messages: [{message: String, username: String, createdAt: {type: Date, default: Date.now}}],
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;