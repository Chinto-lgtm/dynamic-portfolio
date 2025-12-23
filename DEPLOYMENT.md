# Deployment Guide

Complete guide for deploying your portfolio to production.

## 🚀 Frontend Deployment

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Free hosting
- Automatic deployments from Git
- Built-in CDN
- Zero configuration

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Connect your GitHub repository
- Configure:
  - Framework Preset: Create React App
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Environment Variables (if using backend):
    - `REACT_APP_API_URL=https://your-backend.com/api`

3. **Deploy**
- Click "Deploy"
- Your site will be live at `https://your-project.vercel.app`

---

### Option 2: Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag & drop your `build` folder
- Or connect GitHub repository

3. **Configure**
- Build command: `npm run build`
- Publish directory: `build`
- Add environment variables if needed

---

### Option 3: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

---

## 🗄️ Backend Deployment

### Option 1: Railway (Easiest)

**Why Railway?**
- Free $5/month credit
- MongoDB included
- One-click deploy
- Auto-scaling

**Steps:**

1. **Push backend to GitHub**
```bash
cd backend
git init
git add .
git commit -m "Backend setup"
git push origin main
```

2. **Deploy on Railway**
- Go to [railway.app](https://railway.app)
- Click "Start a New Project"
- Select "Deploy from GitHub repo"
- Choose your backend repository

3. **Add MongoDB**
- Click "+ New"
- Select "Database" → "MongoDB"
- Railway will create a MongoDB instance

4. **Set Environment Variables**
```env
MONGODB_URI=${{MongoDB.MONGO_URL}}
JWT_SECRET=your-production-secret-key
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=5000
```

5. **Deploy**
- Railway auto-deploys on push
- Your API will be at: `https://your-app.up.railway.app`

---

### Option 2: Render

1. **Create account** at [render.com](https://render.com)

2. **Create Web Service**
- New → Web Service
- Connect GitHub repository
- Configure:
  - Name: `portfolio-api`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`

3. **Add MongoDB**
- Dashboard → New → PostgreSQL (or use MongoDB Atlas)

4. **Environment Variables**
```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=production-secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend.com
```

---

### Option 3: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login & Create App**
```bash
heroku login
heroku create your-portfolio-api
```

3. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

4. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-app.vercel.app
```

5. **Deploy**
```bash
git push heroku main
```

---

## 🗃️ MongoDB Atlas Setup

**For any hosting platform:**

1. **Create Account**
- Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up (free tier available)

2. **Create Cluster**
- Choose free tier (M0)
- Select region closest to your backend
- Create cluster (takes 5-10 minutes)

3. **Setup Access**
- Database Access → Add New Database User
  - Username: `admin`
  - Password: (generate strong password)
  - Role: Atlas Admin

- Network Access → Add IP Address
  - For development: `0.0.0.0/0` (allow from anywhere)
  - For production: Add your server's IP

4. **Get Connection String**
- Clusters → Connect → Connect your application
- Copy connection string:
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

5. **Update Backend .env**
```env
MONGODB_URI=mongodb+srv://admin:your-password@cluster0.xxxxx.mongodb.net/portfolio
```

---

## 🔐 Security Checklist

### Frontend

- [ ] Remove console.logs
- [ ] Add .env to .gitignore
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Add security headers
- [ ] Minify JavaScript (automatic in build)

### Backend

- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable CORS only for your domain
- [ ] Use environment variables
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use HTTPS only
- [ ] Hide error details in production
- [ ] Regular security updates

---

## 📊 Environment Variables

### Frontend (.env)

```env
REACT_APP_API_URL=https://your-backend.com/api
```

### Backend (.env)

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# Server
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=super-secret-key-min-32-chars-long

# CORS
FRONTEND_URL=https://your-portfolio.vercel.app

# Optional: Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Vercel/Netlify (Frontend):**
- Automatically deploys on Git push
- Preview deployments for pull requests
- Production deployment for main branch

**Railway/Render (Backend):**
- Auto-deploy on push to main branch
- Automatic rollback on failure

### Manual Deployment

```bash
# Frontend
npm run build
# Upload build folder to host

# Backend
git push heroku main
# Or use Railway/Render dashboard
```

---

## 🧪 Pre-Deployment Testing

### Local Testing

```bash
# Build frontend
npm run build

# Serve locally
npx serve -s build

# Test backend
cd backend
npm start
```

### Test Checklist

- [ ] All pages load correctly
- [ ] Admin login works
- [ ] CRUD operations function
- [ ] Forms validate properly
- [ ] Images load correctly
- [ ] Responsive on mobile
- [ ] Theme changes apply
- [ ] Contact form submits
- [ ] No console errors
- [ ] API calls succeed

---

## 🌐 Custom Domain Setup

### Vercel

1. **Add Domain**
- Project Settings → Domains
- Add your domain (e.g., `yourname.com`)

2. **DNS Configuration**
Add these records to your domain provider:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify

1. **Add Domain**
- Site Settings → Domain Management
- Add custom domain

2. **Update DNS**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## 📈 Monitoring & Analytics

### Add Google Analytics

1. **Get tracking ID** from analytics.google.com

2. **Add to index.html**
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Backend Monitoring

**Use Railway/Render dashboards for:**
- Response times
- Error rates
- Request volume
- Resource usage

---

## 🐛 Troubleshooting Deployment

### Frontend Issues

**Build Fails:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment variables not working:**
- Ensure they start with `REACT_APP_`
- Restart development server
- Check Vercel/Netlify dashboard

**404 on refresh:**
Add `_redirects` file in public folder:
```
/*    /index.html   200
```

### Backend Issues

**MongoDB connection fails:**
- Check IP whitelist in MongoDB Atlas
- Verify connection string
- Check firewall settings

**API not responding:**
- Check backend logs
- Verify environment variables
- Test health endpoint: `/api/health`

**CORS errors:**
- Update FRONTEND_URL in backend .env
- Check CORS middleware configuration

---

## 💰 Cost Estimate

### Free Tier (Perfect for Portfolio)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Vercel | Free | 100GB bandwidth/month |
| Railway | $5 credit/month | ~500 hours |
| MongoDB Atlas | Free | 512MB storage |
| **Total** | **$0-5/month** | Enough for most portfolios |

### Paid Options (If Needed)

| Service | Cost | When Needed |
|---------|------|-------------|
| Vercel Pro | $20/month | Team features, more bandwidth |
| Railway Pro | $20/month | More resources, support |
| MongoDB | $9+/month | More storage, backups |

---

## 📝 Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and responding
- [ ] MongoDB connected
- [ ] Admin login works
- [ ] SSL certificate active (HTTPS)
- [ ] Custom domain configured
- [ ] Analytics tracking working
- [ ] Contact form emails working
- [ ] All images loading
- [ ] Mobile responsive verified
- [ ] SEO meta tags added
- [ ] Sitemap.xml created
- [ ] Performance tested
- [ ] Backup strategy in place

---

## 🎯 SEO Optimization

Add to public/index.html:

```html
<head>
  <meta name="description" content="Your portfolio description">
  <meta name="keywords" content="developer, portfolio, react, mongodb">
  <meta property="og:title" content="Your Name - Portfolio">
  <meta property="og:description" content="Your description">
  <meta property="og:image" content="https://yoursite.com/preview.jpg">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

---

**You're ready to deploy! 🚀**

For issues, check server logs and verify all environment variables.
