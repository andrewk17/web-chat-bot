const db = require('./index.js');
const User = require('./models/user.js');
const Promise = require("bluebird");

module.exports = {
  addToUser(req, cb) {
    return new Promise(function(resolve, reject) {
      const reqData = req.body,
        query = {
          name: reqData.name
        };
        update = {},
        options = {
          upsert: true,
        };
        
      update[reqData.field.key] = reqData.field.value;

      User.findOneAndUpdate(query, update, options)
        .then(function() {
          resolve();
        })
        .catch(function(error) {
          reject(error);
        })
    })
  }
};
