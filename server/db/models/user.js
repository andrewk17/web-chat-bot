const mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
  name: String,
  address: String,
  education: String,
  workExperience: String,
  resume: String,
  linkedIn: String,
});

var user = mongoose.model('User', userSchema);

module.exports = user;
