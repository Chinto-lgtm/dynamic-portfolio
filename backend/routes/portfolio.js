const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const router = express.Router();

// =================================================================
// 1. PUBLIC ROUTES (Get Data & Send Email)
// =================================================================

// Get All Data
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json(portfolio || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ CONTACT FORM (SECURE EMAIL SENDING)
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. Configure Transporter using .env variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 2. Configure Email Options (Fixed for Gmail Policies)
    const mailOptions = {
      from: process.env.EMAIL_USER,   // ⚠️ MUST be your authenticated email
      to: process.env.EMAIL_USER,     // Sending to yourself
      replyTo: email,                 // ⚠️ Visitor's email goes here
      subject: `Portfolio Message from ${name}`,
      text: `
        You have received a new message via your Portfolio contact form.

        --------------------------------------------------
        Name:    ${name}
        Email:   ${email}
        --------------------------------------------------
        
        Message:
        ${message}
      `
    };

    // 3. Send Email
    await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully from ${name}`);
    res.json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ error: "Failed to send email. Check server logs." });
  }
});


// =================================================================
// 2. SINGLE SECTIONS (Hero, About, Contact Info, Social, Theme)
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
router.put('/contact', auth, (req, res) => updateSingle(req, res, 'contact')); // Updates address/phone text
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
    // Return the last item added
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
// 4. DELETE & UPDATE ROUTES (Items in Arrays)
// =================================================================

// --- DELETE HELPER ---
const deleteItem = async (req, res, field) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $pull: { [field]: { _id: req.params.id } } }, // Remove item by _id
      { new: true }
    );
    
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
    
    res.json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- UPDATE HELPER ---
const updateItem = async (req, res, field) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.userId });
    if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });

    // 1. Find specific item
    const item = portfolio[field].id(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    // 2. Remove _id from body to prevent "Modifying immutable field" error
    const { _id, ...updateData } = req.body;

    // 3. Update
    item.set(updateData);
    
    // 4. Save
    await portfolio.save();
    
    // 5. Return ONLY the updated item
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