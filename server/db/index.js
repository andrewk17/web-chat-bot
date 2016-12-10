const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/stella';

const db = mongoose.connect(mongoUri);

module.exports = db;
