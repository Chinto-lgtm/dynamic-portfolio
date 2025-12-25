require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// 🔍 LOGGING MIDDLEWARE (New)
// ==========================================
app.use((req, res, next) => {
  // This prints to Vercel Logs whenever a request hits the server
  console.log(`➡️  [BACKEND HIT] Method: ${req.method} | Path: ${req.url}`);
  next();
});
// ==========================================

// MongoDB Connection (Optimized for Serverless)
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB Connected');
    } catch (err) {
      console.error('❌ MongoDB Error:', err);
    }
  }
};

// Connect immediately
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

// DEFAULT ROUTE
app.get('/', (req, res) => {
  res.send('Portfolio Backend is Live');
});

// =================================================================
// CRITICAL EXPORT FOR VERCEL
// =================================================================

// 1. Export the app
module.exports = app;

// 2. Only run app.listen() if we are NOT on Vercel
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}