var tokenController = require('../db/tokendb/tokenController.js');

module.exports = function(app, express) {
  app.get('/', tokenController.getLocationMessages)
  app.post('/', tokenController.createToken)
  app.put('/', tokenController.writeToToken)
}