const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();

// Get portfolio data (public)
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json(portfolio || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update hero section (protected)
router.put('/hero', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: { hero: req.body, updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add qualification (protected)
router.post('/qualifications', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { 
        $push: { qualifications: req.body },
        $set: { updatedAt: Date.now() }
      },
      { new: true, upsert: true }
    );
    res.json(portfolio.qualifications[portfolio.qualifications.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update qualification (protected)
router.put('/qualifications/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId, 'qualifications._id': req.params.id },
      { 
        $set: { 
          'qualifications.$': { ...req.body, _id: req.params.id },
          updatedAt: Date.now()
        }
      },
      { new: true }
    );
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete qualification (protected)
router.delete('/qualifications/:id', auth, async (req, res) => {
  try {
    await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { 
        $pull: { qualifications: { _id: req.params.id } },
        $set: { updatedAt: Date.now() }
      }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Similar routes for skills, experience, projects, testimonials...
// (Follow the same pattern as qualifications)

module.exports = router;