const express = require('express');
const HomeModel = require('../models/HomeSchema'); // Assuming you created the NewsSchema file
const router = express.Router();

router.get('/news', async (req, res) => {
  try {
    const newsData = await HomeModel.find();
    res.json(newsData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
