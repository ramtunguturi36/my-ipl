// routes/HomeRoute.js
const express = require('express');
const HomeModel = require('../models/HomeSchema');
const router = express.Router();

router.get('/home', async (req, res) => {
  try {
    const data = await HomeModel.find();
    console.log('Data fetched from MongoDB:', data); // Add this line
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
