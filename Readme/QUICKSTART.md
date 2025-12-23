# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Immediate Setup (No Backend)

### 1. Install & Run

```bash
# Install dependencies
npm install

# Start the app
npm start
```

The app will open at **http://localhost:3000**

### 2. Access Admin Panel

Go to **http://localhost:3000/admin**

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

### 3. Customize Your Portfolio

1. Click on any section in the sidebar (Hero, About, Skills, etc.)
2. Edit the content
3. Click "Save Changes"
4. View your portfolio at http://localhost:3000

That's it! Your data is saved automatically in localStorage.

---

## 🗄️ MongoDB Backend Setup (Optional)

If you want to connect to MongoDB:

### Step 1: Set up backend

```bash
# Create backend folder
mkdir backend
cd backend

# Install dependencies
npm install express mongoose dotenv bcryptjs jsonwebtoken cors

# Create files from backend-example/
```

### Step 2: Configure MongoDB

Create `.env` in backend folder:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=your-secret-key-here
```

### Step 3: Start backend

```bash
cd backend
npm start
```

### Step 4: Connect frontend to backend

In `/config/api.js`, change:

```javascript
export const USE_BACKEND = true;
```

### Step 5: Restart frontend

```bash
npm start
```

---

## 📝 Customization Tips

### Change Default Data

Edit `/context/PortfolioContext.jsx` → `initialData` object

### Add Custom Sections

Use the **Form Builder** in admin panel:
1. Go to Admin → Form Builder
2. Click "Create Section"
3. Define your fields
4. Add entries

### Change Theme Colors

1. Go to Admin → Theme
2. Modify OKLCH color values
3. See live preview
4. Save changes

### Export Your Data

1. Go to Admin → Dashboard
2. Click "Export Data as JSON"
3. Download the JSON file
4. Use it for backup or migration

---

## 🔧 File Structure Overview

```
Key Files:
├── /App.jsx                    # Main app with routing
├── /config/api.js              # Backend configuration
├── /context/PortfolioContext.jsx  # Data management
├── /pages/Portfolio.jsx        # Public portfolio
├── /pages/Admin.jsx            # Admin dashboard
└── /components/                # All React components
```

---

## 💡 Common Tasks

### Update Profile Picture

Admin → Hero Section → Profile Image URL

### Add New Project

Admin → Projects → Add Project

### Change Contact Email

Admin → Contact → Contact Details

### Create Custom Content Type

Admin → Form Builder → Create Section

---

## 🐛 Troubleshooting

**App won't start?**
- Run `npm install` again
- Check Node.js version (14+ required)

**Admin login not working?**
- Use: username `admin`, password `admin123`
- Clear browser localStorage
- Check browser console for errors

**Changes not saving?**
- Check if localStorage is enabled
- Clear cache and reload
- Check browser console

**Backend connection failing?**
- Verify MongoDB is running
- Check backend server is on port 5000
- Verify USE_BACKEND=true in config/api.js

---

## 📚 Next Steps

1. **Customize Content**: Fill in your real data
2. **Upload Images**: Use Unsplash, Imgur, or your own hosting
3. **Theme**: Customize colors to match your brand
4. **Deploy**: 
   - Frontend: Vercel, Netlify
   - Backend: Heroku, Railway, Render

---

## 🎯 Production Checklist

Before deploying:

- [ ] Replace all placeholder data with your information
- [ ] Upload proper images (profile, projects, etc.)
- [ ] Update contact information
- [ ] Customize theme colors
- [ ] Change admin password (if using backend)
- [ ] Test on mobile devices
- [ ] Test all forms
- [ ] Export data backup
- [ ] Set up backend (if needed)
- [ ] Configure environment variables

---

## 📞 Need Help?

1. Check [README.md](./README.md) for full documentation
2. Review [BACKEND_SETUP.md](./BACKEND_SETUP.md) for backend details
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Happy building! 🎉**
