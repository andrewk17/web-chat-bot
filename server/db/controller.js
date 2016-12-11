const db = require('./index.js');
const User = require('./models/user.js');

module.exports = {
  // performs upsert with the name as the key
  addToUser(req) {
    const reqData = req.body,
      query = {
        name: reqData.name
      },
      update = {},
      options = {
        upsert: true
      };

    update[reqData.field.key] = reqData.field.value;
    // returns promise
    return User.findOneAndUpdate(query, update, options);
  },

  // retrieves document based on name
  retrieveUserData(req) {
    const userName = req.query.userName;
    return User.where({name: userName}).findOne(); // return promise
  }
};
