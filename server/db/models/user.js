'use strict';

const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
  name: String,
  address: String,
  education: String,
  workExperience: String,
  resume: String,
  linkedIn: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;
