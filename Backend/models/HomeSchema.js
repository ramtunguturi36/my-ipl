const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  heading: String,
  subContent: String,
  imageURL: String,
  targetLink: String,
  innerPara: String,
});

module.exports = mongoose.model('Home', HomeSchema, 'Home'); // Explicitly specify the collection name
