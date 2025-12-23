# Dynamic Portfolio Website with Admin Dashboard

A fully-featured, responsive portfolio website with a comprehensive admin dashboard for managing all content. Built with React and designed to work with or without a MongoDB backend.

## ✨ Features

### Public Portfolio
- **Hero Section** - Dynamic role rotation, profile image, CV download
- **About Section** - Personal introduction with image
- **Qualifications** - Education and certifications timeline
- **Skills** - Categorized skill bars with proficiency levels
- **Experience** - Work history with detailed achievements
- **Projects** - Portfolio projects with images, tags, and links
- **Testimonials** - Client and colleague recommendations
- **Contact** - Contact form with social media links
- **Responsive Design** - Optimized for desktop (1440px), tablet (768px), and mobile (375px)
- **Theme System** - Customizable color scheme with OKLCH colors

### Admin Dashboard
- **Authentication** - Secure login system
- **Dashboard Overview** - Statistics and quick actions
- **Content Management** - Full CRUD operations for all sections
- **Theme Customization** - Visual theme editor with live preview
- **Form Builder** - Create custom content sections dynamically
- **Data Export** - Export portfolio data as JSON
- **Real-time Preview** - Changes reflect immediately

## 🚀 Quick Start

### Option 1: Local Storage (No Backend)

```bash
# Install dependencies
npm install

# Start the application
npm start
```

That's it! The app runs on http://localhost:3000 with localStorage.

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### Option 2: With MongoDB Backend

1. **Set up backend** (see [BACKEND_SETUP.md](./BACKEND_SETUP.md))

2. **Configure frontend** - In `/config/api.js`:
```javascript
export const USE_BACKEND = true;
export const API_BASE_URL = 'http://localhost:5000/api';
```

3. **Start frontend:**
```bash
npm start
```

## 📁 Project Structure

```
portfolio/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Tag.jsx
│   │   ├── Toast.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Qualifications.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── admin/           # Admin dashboard components
│   │       ├── AdminLayout.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── HeroAdmin.jsx
│   │       ├── AboutAdmin.jsx
│   │       ├── QualificationsAdmin.jsx
│   │       ├── SkillsAdmin.jsx
│   │       ├── ExperienceAdmin.jsx
│   │       ├── ProjectsAdmin.jsx
│   │       ├── TestimonialsAdmin.jsx
│   │       ├── ContactAdmin.jsx
│   │       ├── ThemeAdmin.jsx
│   │       ├── FormBuilder.jsx
│   │       └── Login.jsx
│   ├── context/
│   │   └── PortfolioContext.jsx  # Global state management
│   ├── hooks/
│   │   └── usePortfolio.jsx      # Custom hook
│   ├── pages/
│   │   ├── Portfolio.jsx         # Public portfolio page
│   │   └── Admin.jsx             # Admin dashboard page
│   ├── services/
│   │   └── portfolioService.js   # API integration layer
│   ├── config/
│   │   └── api.js                # API configuration
│   ├── styles/
│   │   └── globals.css           # Global styles & design tokens
│   ├── App.jsx                   # Main app component
│   └── index.js                  # Entry point
├── backend-example/              # Example backend implementation
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── BACKEND_SETUP.md              # Backend setup guide
└── README.md
```

## 🎨 Design System

### Color Tokens (OKLCH Format)
```css
--color-primary: oklch(0.55 0.25 262)      /* Brand color */
--color-secondary: oklch(0.65 0.20 220)    /* Supporting color */
--color-accent: oklch(0.75 0.18 160)       /* Highlight color */
--color-bg: oklch(0.98 0.01 260)           /* Background */
--color-surface: oklch(1.0 0 0)            /* Card backgrounds */
--color-text: oklch(0.25 0.02 260)         /* Text color */
```

### Component Variants
- **Buttons**: primary, secondary, outline, ghost, danger
- **Tags**: default, secondary, accent, outline
- **Cards**: hover effects, multiple padding sizes
- **Inputs**: text, textarea, select with validation

### Typography Scale
- H1: 3rem (48px) - Page titles
- H2: 2.25rem (36px) - Section headings
- H3: 1.875rem (30px) - Subsection headings
- H4: 1.5rem (24px) - Card titles
- H5: 1.25rem (20px) - Small headings
- H6: 1.125rem (18px) - Labels
- P: 1rem (16px) - Body text

## 📊 Data Structure

All portfolio data follows this JSON structure:

```json
{
  "hero": {
    "name": "string",
    "roles": ["string"],
    "intro": "string",
    "profileImage": "url",
    "cvUrl": "url"
  },
  "about": {
    "heading": "string",
    "paragraph": "string (use \\n\\n for paragraphs)",
    "image": "url"
  },
  "qualifications": [{
    "id": "string",
    "title": "string",
    "institution": "string",
    "startDate": "YYYY-MM",
    "endDate": "YYYY-MM | null",
    "description": "string"
  }],
  "skills": [{
    "id": "string",
    "label": "string",
    "level": "number (0-100)",
    "category": "string"
  }],
  "experience": [{
    "id": "string",
    "company": "string",
    "role": "string",
    "startDate": "YYYY-MM",
    "endDate": "YYYY-MM | null",
    "current": "boolean",
    "bullets": ["string"]
  }],
  "projects": [{
    "id": "string",
    "title": "string",
    "description": "string",
    "image": "url",
    "tags": ["string"],
    "links": {
      "live": "url",
      "github": "url"
    }
  }],
  "testimonials": [{
    "id": "string",
    "name": "string",
    "role": "string",
    "company": "string",
    "content": "string",
    "avatar": "url"
  }],
  "contact": {
    "email": "string",
    "phone": "string",
    "location": "string"
  },
  "social": {
    "github": "url",
    "linkedin": "url",
    "twitter": "url",
    "portfolio": "url"
  },
  "theme": {
    "primary": "oklch(...)",
    "secondary": "oklch(...)",
    "accent": "oklch(...)",
    "bg": "oklch(...)",
    "surface": "oklch(...)",
    "text": "oklch(...)"
  },
  "customSections": [{
    "id": "string",
    "name": "string",
    "fields": [{
      "id": "string",
      "label": "string",
      "name": "string",
      "type": "text|textarea|number|date|select|image-url",
      "required": "boolean"
    }],
    "entries": [{}]
  }]
}
```

## 🔧 Configuration

### Switch Between Local & Backend

In `/config/api.js`:

```javascript
// Use localStorage (default)
export const USE_BACKEND = false;

// Use MongoDB backend
export const USE_BACKEND = true;
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Environment Variables

Create `.env` in root:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start development server
npm build          # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Adding New Sections

1. **Add to initial data** in `PortfolioContext.jsx`
2. **Create component** in `/components/`
3. **Create admin component** in `/components/admin/`
4. **Add CRUD functions** to context
5. **Update service** in `portfolioService.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## 🔐 Security Features

- ✅ JWT authentication (backend mode)
- ✅ Password hashing with bcrypt
- ✅ Protected admin routes
- ✅ Input validation
- ✅ XSS protection
- ✅ CORS configuration

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables if using backend

### Backend (Heroku/Railway/Render)

1. Create new app
2. Connect GitHub repository
3. Add environment variables
4. Deploy from `backend-example` directory

## 📝 API Endpoints (Backend Mode)

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register admin

### Portfolio Data
- `GET /api/portfolio` - Get all data
- `PUT /api/portfolio/hero` - Update hero
- `PUT /api/portfolio/about` - Update about
- `POST /api/portfolio/qualifications` - Add qualification
- `PUT /api/portfolio/qualifications/:id` - Update qualification
- `DELETE /api/portfolio/qualifications/:id` - Delete qualification

*(Similar endpoints for skills, experience, projects, testimonials)*

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 💬 Support

For issues or questions:
1. Check existing documentation
2. Review BACKEND_SETUP.md for backend issues
3. Check browser console for errors
4. Verify localStorage is enabled

## 🎉 Credits

Built with:
- React
- Tailwind CSS v4
- Lucide React Icons
- MongoDB & Mongoose (optional)
- Express.js (optional)

---

**Happy Building! 🚀**
#   d y n a m i c - p o r t f o l i o  
 