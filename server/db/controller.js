const db = require('./index.js');
const User = require('./models/user.js');
var Promise = require("bluebird");

module.exports = {
  addToUser(req, cb) {
    return new Promise(function(resolve, reject) {
      const user = new User({
        name: 'andrew',
        address: req.address,
        education: req.education,
        workExperience: req.workExperience,
        resume: req.resume,
        linkedInURL: req.linkedInURL,
      });
      user.save();
      resolve();
    })
  }
};
