const db = require('./index.js');
const User = require('./models/user.js');

module.exports = {
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

    return User.findOneAndUpdate(query, update, options);
  },

  retrieveUserData(req) {
    const userName = req.query.userName;
    return User.where({name: userName}).findOne();
  },
};
