var express = require('express');
var app = express();

// db is defined in config.js and passed in as module.exports.connect;
var db = require('./db/config.js');
db.connect()

// Invoke middleware function on app to 'use' all middleware functions.
var middleware = require('./serverhelpers/middleware.js');
middleware(app, express);

// Invoke routers function on app to provide access to all routes defined.
var routers = require('./serverhelpers/routes.js');
routers(app, express);

// App now listening on port 3000.
app.listen(3000, function(err) {
  err ? console.log('server error', err) : console.log('server running port 3000') //console.log(path.join(__dirname, '../client'));
})