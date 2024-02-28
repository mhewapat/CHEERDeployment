const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  title: String,
  pdf: String,
  uploadDate: Date,
});

// If you're accessing it as mongoose.model('nlmodel') elsewhere in your code,
// make sure the name here matches 'nlmodel'.
module.exports = mongoose.model('Newsletters', newsletterSchema);
