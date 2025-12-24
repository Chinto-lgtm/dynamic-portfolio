const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();

// =================================================================
// 1. PUBLIC ROUTE (Get All Data)
// =================================================================
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json(portfolio || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =================================================================
// 2. SINGLE SECTIONS (Hero, About, Contact, Social, Theme)
// =================================================================

// Helper for Single Sections
const updateSingle = async (req, res, field) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: { [field]: req.body, updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    res.json(portfolio[field]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.put('/hero', auth, (req, res) => updateSingle(req, res, 'hero'));
router.put('/about', auth, (req, res) => updateSingle(req, res, 'about'));
router.put('/contact', auth, (req, res) => updateSingle(req, res, 'contact'));
router.put('/social', auth, (req, res) => updateSingle(req, res, 'social'));
router.put('/theme', auth, (req, res) => updateSingle(req, res, 'theme'));


// =================================================================
// 3. ARRAY SECTIONS (Add New Items)
// =================================================================

const addItem = async (req, res, field) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $push: { [field]: req.body }, $set: { updatedAt: Date.now() } },
      { new: true, upsert: true }
    );
    // Return the last item added (which is now at the end of the array)
    const newArray = portfolio[field];
    res.json(newArray[newArray.length - 1]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post('/skills', auth, (req, res) => addItem(req, res, 'skills'));
router.post('/projects', auth, (req, res) => addItem(req, res, 'projects'));
router.post('/experience', auth, (req, res) => addItem(req, res, 'experience'));
router.post('/qualifications', auth, (req, res) => addItem(req, res, 'qualifications'));
router.post('/testimonials', auth, (req, res) => addItem(req, res, 'testimonials'));


// =================================================================
// 4. DELETE & UPDATE ROUTES (FIXED)
// =================================================================

// --- DELETE HELPER ---
const deleteItem = async (req, res, field) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { [field]: { _id: req.params.id } } }, // Remove item with matching _id
      { new: true }
    );
    
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
    
    // Return success
    res.json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- UPDATE HELPER (BUG FIXED HERE) ---
const updateItem = async (req, res, field) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });

    // 1. Find the specific item in the array
    const item = portfolio[field].id(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    // 2. SAFETY FIX: Remove _id from the update data so Mongoose doesn't crash
    const { _id, ...updateData } = req.body;

    // 3. Update the item
    item.set(updateData);
    
    // 4. Save
    await portfolio.save();
    
    // 5. Return ONLY the updated item (as an Object)
    res.json(item); 
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// --- DEFINE THE ROUTES ---

// Skills
router.delete('/skills/:id', auth, (req, res) => deleteItem(req, res, 'skills'));
router.put('/skills/:id', auth, (req, res) => updateItem(req, res, 'skills'));

// Projects
router.delete('/projects/:id', auth, (req, res) => deleteItem(req, res, 'projects'));
router.put('/projects/:id', auth, (req, res) => updateItem(req, res, 'projects'));

// Experience
router.delete('/experience/:id', auth, (req, res) => deleteItem(req, res, 'experience'));
router.put('/experience/:id', auth, (req, res) => updateItem(req, res, 'experience'));

// Qualifications
router.delete('/qualifications/:id', auth, (req, res) => deleteItem(req, res, 'qualifications'));
router.put('/qualifications/:id', auth, (req, res) => updateItem(req, res, 'qualifications'));

// Testimonials
router.delete('/testimonials/:id', auth, (req, res) => deleteItem(req, res, 'testimonials'));
router.put('/testimonials/:id', auth, (req, res) => updateItem(req, res, 'testimonials'));

module.exports = router;