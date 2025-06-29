const express = require('express');
const router = express.Router();
const MLR = require('../models/MLR');

router.get('/api/reports', async (req, res) => {
  try {
    const reports = await MLR.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).send('Error fetching reports');
  }
});

router.delete('/api/reports/:id', async (req, res) => {
  try {
    await MLR.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error deleting report:', err);
    res.status(500).send('Error deleting report');
  }
});

module.exports = router;