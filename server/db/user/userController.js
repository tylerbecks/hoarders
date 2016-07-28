const User = require('./userModel.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  validateUserLogin: (username, password, socket) => {
    User.findOne({ 'username': username }, (err, userData) => {
      var user = false;
      if (userData) {
        user = userData.password === password ? username : false;
        if (!user) {
          socket.emit('Authentication', false);
        }
        socket.emit('Authentication', userData);
      } else {
        socket.emit('Authentication', false);
      }
    });
  },

  validateUserSignup: (username, password, socket) => {
    User.findOne({ 'username': username }, (err, userData) => {
      if (userData) {
        socket.emit('Authentication', false);
      } else {
        User.create({
          username,
          password,
        }).then((createdUser) => {
          console.log(createdUser);
          socket.emit('Authentication', createdUser);
        }).catch((err) => {
          console.log('Failed to create User Data', err);
        });
      }
    });
  },

  updateUserPoints: (username, location,  socket) => {
    var newLocA = location.substring(0, 7);
    var newLocB = location.substring(8, 17);
    var newLoc = String(newLocA) + String(newLocB);

    User.findOne({ username }, (err, userData) => { 
      if (userData) {
        var flag = true;
        if (userData.locations.length < 1) {
          console.log('this should happen very first time');
          userData.locations.push(newLoc);
          userData.points++; 
          userData.markModified('locations', 'points');
          userData.save(() => {
            console.log('saving userdata');
          });
          socket.emit('updateUserPoints', true);
        } else {
          for (var i = 0; i < userData.locations.length; i++) {
            if (userData.locations[i] === newLoc) {
              console.log('user already visited location');
              socket.emit('updateUserPoints', false);
              flag = false;
            }
          }
          if (flag) {
            console.log('user hasnt been here');
            userData.locations.push(newLoc);
            userData.points++;
            userData.markModified('locations', 'points');
            userData.save(() => {
              console.log('saving new userData');
            });
            socket.emit('updateUserPoints', true);
          } 
        }
      }
    });
  },

  getUserScore: (username, socket) => {
    User.findOne({ username }, (err, userData) => {
      console.log('the userdata is, ', userData);
      if (userData) {
        console.log('passing user data', userData.points);
        socket.emit('getUserScore', userData.points); 
      } else {
        console.log('passing zero back', userData.points);
        socket.emit('getUserScore', 0);
      }
    })
  },
};
