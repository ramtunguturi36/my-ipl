// db.js
const mongoose = require('mongoose');
//const mongoURI = 'mongodb://localhost:27017/sportsSummaries';
const mongoURI = 'mongodb://localhost:27017/IPL';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectToMongo;
