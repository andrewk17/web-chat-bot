const db = require('./index.js');
const User = require('./models/user.js');
var Promise = require("bluebird");

module.exports = {
  addToUser(req, cb) {
    return new Promise(function(resolve, reject) {
      const reqData = req.body;
      const query = {
        name: reqData.name
      };
      const update =   {
          address: reqData.address,
          education: reqData.education,
          workExperience: reqData.workExperience,
          resume: reqData.resume,
          linkedInURL: reqData.linkedInURL,
        };
      const options = {
        upsert: true,
      }
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
