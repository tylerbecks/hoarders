const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports.connect = () => {
  mongoose.connect('mongodb://root:cake@ds031995.mlab.com:31995/crumbs', (err) => {
    err ? console.log(err) : console.log('db connected');
  });
};
