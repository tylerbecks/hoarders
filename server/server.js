const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// db is defined in config.js and passed in as module.exports.connect;
const db = require('./db/config.js');
db.connect();

// Invoke middleware function on app to 'use' all middleware functions.
const middleware = require('./serverhelpers/middleware.js');
middleware(app);

// // Invoke routers function on app to provide access to all routes defined.
const routers = require('./serverhelpers/routes.js');
io.on('connection', (socket) => routers(socket));

// App now listening on port 3000.
server.listen(3000, (err) => {
  err ? console.log('server error', err) : console.log('server running port 3000');
});

