// describe('chatroom contoller functionality', function() {

//   var clientSocket;
//   var serverIo;

//   beforeEach(function() {
//     const express = require('express');
//     const app = express();
//     const server = require('http').Server(app);
//     serverIo = require('socket.io')(server);
//     const clientIo = require('socket.io-client');
//     const mongoose = require('mongoose');

//     mongoose.Promise = require('bluebird');
//     mongoose.connect('mongodb://127.0.0.1:27017/crumbsTestdb', (err) => {
//       err ? console.log(err) : console.log('db connected');
//     });

//     server.listen(8080, (err) => {
//       err ? console.log('server error', err) : console.log('server running port 8080');
//     });

//     const chatroomSchema = mongoose.Schema({
//       location: String,
//       messages: [{message: String, username: String, createdAt: {type: Date, default: Date.now}}],
//     });
//     const userSchema = mongoose.Schema({
//       username: String,
//       password: String,
//     });

//     const Chatroom = mongoose.model('Chatroom', chatroomSchema);
//     const User = mongoose.model('User', userSchema);

//     User.remove({}, function(err) { 
//        console.log('collection removed') 
//     });
//     Chatroom.remove({}, function(err) { 
//        console.log('collection removed') 
//     });

//     User.create({
//       username: 'Roy',
//       password: '123',
//     });

//     User.create({
//       username: 'Matt',
//       password: '123',
//     });

//     User.create({
//       username: 'Steen',
//       password: '321',
//     });

//     Chatroom.create({
//       location: '33.344-122.234',
//       messages: [],
//     });

//     Chatroom.create({
//       locaion: '33.213-122.300',
//       messages: [
//         { message: 'Hello I am Dubie', username: 'Matt', createdAt: new Date() },
//         { message: 'Hello I am Roy', username: 'Roy', createdAt: new Date() },
//         { message: 'Hello I am Steven', username: 'Steven', createdAt: new Date() },
//       ],
//     });

//     clientSocket = clientIo.connect('http://localhost:8080', {
//       'reconnection delay': 0,
//       'reopen delay': 0,
//       'force new connection': true,
//     });

//     clientSocket.on('connect', function() {
//       console.log('worked...');
//       done();
//     });

//     clientSocket.on('disconnect', function() {
//       console.log('disconnected...');
//     });
//   });

//   afterEach(function(done) {
//     if (clientSocket.connected) {
//       console.log('disconnecting...');
//       clientSocket.disconnect();
//     } else {
//       console.log('no connection to break...');
//     }
//     done();
//   });


//   it('should have an `age` property that is set to `40`', function() {
//     serverIo.on('connection', (socket) => {
//       console.log('Server socker connected');
//       //server emit here
//       socket.emit('testing', 'test');
//     });

//     //client listener here
//     clientSocket.on('testing', function(data) {
//       console.log('Client socket receive', data);
//       done();
//     });
//   });

// });




// /*
// Client
// Server
//   Chatroom controller
//     before each:
//       Things Needed
//          1. Location with 2 messages in db
//          2. instantiate new socket.io at port 8080
//          3. instantiate client socket at port 7070
//          4. instantiate a database
//       db connection
//       instantiate a socket
//     updateMessagesState
//       expect a socket emit with tag of updateMessagesState
//       if we are in a chatroom
//         expect the socket emit data object to be an object 
//         expect to have location and messages properties
//         expect message 1 to equal 'roy was here'
//       if we are not in chatroom
//         expect the socket emit data to be null
//     createChatRoom
//       call createChat room with sample location
//       expect a db query at written location return an empty array
//       expect a socket emit with tag of updateMessagesState
//       expect the socket emit data object to be an object 
//       expect to have location and messages properties
//       expect messages to be an empty array
//     addMessageToChatRoom
//       call addMessageToChatRoom with a location, message, username, socket
//       query db with given location 
//       expect database to have an message array at location
//       expect lcation message[0] to equal given message
//       expect a socket emit with tag of updateMessagesState
//       expect the socket emit data object to be an object 
//       expect to have location and messages properties
//       expect messages[0] to equal given message
//   User controller
//     validateUserLogin
//       call validateUserLogin with a username, password, and socket
//       query database with given username
//       expect the socket emit with a tag of Authentication
//         if (userData === object && password === userData.password)
//            expect user to be username
//         if (userData === object && password !== userData.password)
//            expect user to be false
//         if (userData === null)
//            expect user to be false
//     validateUserSignup
//        call validateUserSignup with a username, password, and socket
//        query database with username
//         if (userData)
//            expect a socket emit with a tag of authentication and false
//         if (!userData)
//            expect a user to be created in the database with username and password
//            expect a socket emit with Authentication and username
//   routes
//     expect updateMessageState to respond with an emit updateMessagesState
//     expect createChatRoom to respond with an emit updateMessagesState
//     expect addMessageToChatRoom to respond with an emit updateMessagesState
//     expect validateUserLogin to respond with an emit Authentication
//     expect validateUserSignup to respond with an emit Authentication


//  */