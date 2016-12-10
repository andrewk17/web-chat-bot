const db = require('./index.js');
const User = require('./models/user.js');

module.exports = {
  addToUser(req, cb) {
    const reqData = req.body,
      query = {
        name: reqData.name
      },
      update = {},
      options = {
        upsert: true
      };

    update[reqData.field.key] = reqData.field.value;

    return User.findOneAndUpdate(query, update, options);
  }
};
