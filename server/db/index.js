const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/stella'

const db = mongoose.connect(mongoUri);

module.exports = db;
