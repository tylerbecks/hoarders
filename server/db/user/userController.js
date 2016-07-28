const User = require('./userModel.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  validateUserLogin: (username, password, socket) => {
    User.findOne({ username }, (err, userData) => {
      var user = false;
      if (userData) {
        user = userData.password === password ? username : false;
        if (user) {
          let username = userData.username;
        } else {
          let username = undefined; 
        }
      }

      let userObj = { username: username, userLoggedIn: user};

      socket.emit('Authentication', userObj);
    });
  },

  validateUserSignup: (username, password, socket) => {
    User.findOne({ username }, (err, userData) => {
      if (userData) {
        socket.emit('Authentication', false);
      } else {
        User.create({
          username,
          password,
        }).then(() => {
          socket.emit('Authentication', username);
        }).catch((err) => {
          console.log('Failed to create User Data', err);
        });
      }
    });
  },

  updateUserPoints: (username, location,  socket) => {
    User.findOne({ username }), (err, userData) => { 
      if (userData) {
        let flag = true; 
        for (var i = 0; i < userData.locations.length; i++) {
          if (userData.locations[i] === location) {
            flag = false;
          }
        }
        if (flag) {
          userData.locations.push(location);
          userData.points++;
          socket.emit('updateUserPoints', true);
        } else {
          socket.emit('updateUserPoints', false);
        }
      }
    }
  }
};
