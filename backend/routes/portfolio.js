const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();

// =================================================================
// 1. PUBLIC ROUTE (Get All Data)
// =================================================================
router.get('/', async (req, res) => {
  try {
    // Fetches the first portfolio found. 
    // Since you are the only user, this works perfectly.
    const portfolio = await Portfolio.findOne();
    res.json(portfolio || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =================================================================
// 2. SINGLE SECTIONS (Hero, About, Contact, Social, Theme)
// =================================================================

// Update Hero
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

// Update About
router.put('/about', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: { about: req.body, updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Contact
router.put('/contact', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: { contact: req.body, updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Social Links
router.put('/social', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: { social: req.body, updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.social);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Theme
router.put('/theme', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: { theme: req.body, updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.theme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =================================================================
// 3. ARRAY SECTIONS (Skills, Projects, Experience, Qualifications)
// =================================================================

// --- QUALIFICATIONS ---
router.post('/qualifications', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $push: { qualifications: req.body }, $set: { updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.qualifications[portfolio.qualifications.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SKILLS ---
router.post('/skills', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $push: { skills: req.body }, $set: { updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    // Return the last added item
    res.json(portfolio.skills[portfolio.skills.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PROJECTS ---
router.post('/projects', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $push: { projects: req.body }, $set: { updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.projects[portfolio.projects.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- EXPERIENCE ---
router.post('/experience', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $push: { experience: req.body }, $set: { updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.experience[portfolio.experience.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- TESTIMONIALS ---
router.post('/testimonials', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $push: { testimonials: req.body }, $set: { updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio.testimonials[portfolio.testimonials.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;