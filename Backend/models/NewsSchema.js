const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: String,
  summary: String,
  imageUrl: String,
  content: String,
  id: String,
});

module.exports = mongoose.model('News', NewsSchema);
