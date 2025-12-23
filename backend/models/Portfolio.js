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