# MongoDB Backend Setup Guide

This portfolio application can work with both local storage (no backend) and a MongoDB backend. Follow this guide to set up the backend.

## Quick Start

### Option 1: Use Local Storage (No Backend Required)
The app works out of the box with localStorage. No setup needed!

### Option 2: Connect to MongoDB Backend

## Backend Architecture

```
backend/
├── server.js              # Express server
├── config/
│   └── db.js             # MongoDB connection
├── models/
│   ├── User.js           # Admin user model
│   ├── Portfolio.js      # Portfolio data model
│   └── ContactForm.js    # Contact submissions
├── routes/
│   ├── auth.js           # Authentication routes
│   └── portfolio.js      # Portfolio CRUD routes
├── middleware/
│   └── auth.js           # JWT authentication
└── package.json
```

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
```

### 2. Create Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env

### 4. Start the Backend Server

```bash
cd backend
npm start
```

Server will run on http://localhost:5000

### 5. Connect Frontend to Backend

In `/config/api.js`, change:

```javascript
export const USE_BACKEND = true; // Changed from false
```

## Backend Code Examples

### server.js

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### models/User.js

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### models/Portfolio.js

```javascript
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hero: {
    name: String,
    roles: [String],
    intro: String,
    profileImage: String,
    cvUrl: String
  },
  about: {
    heading: String,
    paragraph: String,
    image: String
  },
  qualifications: [{
    title: String,
    institution: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [{
    label: String,
    level: Number,
    category: String
  }],
  experience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    bullets: [String]
  }],
  projects: [{
    title: String,
    description: String,
    image: String,
    tags: [String],
    links: {
      live: String,
      github: String
    }
  }],
  testimonials: [{
    name: String,
    role: String,
    company: String,
    content: String,
    avatar: String
  }],
  contact: {
    email: String,
    phone: String,
    location: String
  },
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String
  },
  theme: {
    primary: String,
    secondary: String,
    accent: String,
    bg: String,
    surface: String,
    text: String
  },
  customSections: [{
    name: String,
    fields: [{
      id: String,
      label: String,
      name: String,
      type: String,
      required: Boolean
    }],
    entries: [mongoose.Schema.Types.Mixed]
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
```

### routes/auth.js

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register (Optional - for creating first admin)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### routes/portfolio.js

```javascript
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
```

### middleware/auth.js

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

## Testing the Backend

### 1. Create Admin User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 3. Get Portfolio Data

```bash
curl http://localhost:5000/api/portfolio
```

## Production Deployment

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

### Recommended Hosting

- **Backend**: Heroku, Railway, Render, or DigitalOcean
- **Database**: MongoDB Atlas (free tier available)
- **Frontend**: Vercel, Netlify, or Cloudflare Pages

## Security Checklist

- ✅ Use strong JWT_SECRET
- ✅ Enable CORS only for your domain
- ✅ Use HTTPS in production
- ✅ Rate limit authentication endpoints
- ✅ Validate all inputs
- ✅ Use MongoDB Atlas IP whitelist
- ✅ Regular security updates

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running
- Verify MONGODB_URI is correct
- Check firewall settings

### CORS Error
- Add your frontend URL to CORS whitelist
- Check API_BASE_URL in frontend config

### Authentication Error
- Verify JWT_SECRET matches
- Check token is being sent in headers
- Token may be expired (re-login)

## Support

For issues or questions, check the API logs and MongoDB connection status.
