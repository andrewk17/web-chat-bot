const mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
  name: String,
  address: String,
  education: String,
  workExperience: String,
  resume: String,
  linkedInURL: String,
});

var user = mongoose.model('User', userSchema);

module.exports = user;
