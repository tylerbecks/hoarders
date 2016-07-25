const path = require('path');
const morgan = require('morgan');
const express = require('express');

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, '../../client')));
  app.use(morgan('dev'));
};
