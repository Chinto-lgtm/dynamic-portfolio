# API Testing Guide

Test your MongoDB backend API endpoints using curl or Postman.

## Prerequisites

- Backend server running on `http://localhost:5000`
- MongoDB connected
- Admin user created

## 1. Authentication

### Register Admin User (First Time Only)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully"
}
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Save the token for authenticated requests!**

---

## 2. Portfolio Data (Public Endpoints)

### Get All Portfolio Data

```bash
curl http://localhost:5000/api/portfolio
```

---

## 3. Protected Endpoints (Require Authentication)

Replace `YOUR_TOKEN_HERE` with the token from login response.

### Update Hero Section

```bash
curl -X PUT http://localhost:5000/api/portfolio/hero \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "John Doe",
    "roles": ["Full Stack Developer", "Tech Lead"],
    "intro": "Building amazing web experiences",
    "profileImage": "https://example.com/photo.jpg",
    "cvUrl": "/cv.pdf"
  }'
```

### Update About Section

```bash
curl -X PUT http://localhost:5000/api/portfolio/about \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "heading": "About Me",
    "paragraph": "I am a passionate developer...",
    "image": "https://example.com/about.jpg"
  }'
```

### Add Qualification

```bash
curl -X POST http://localhost:5000/api/portfolio/qualifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Master of Computer Science",
    "institution": "Stanford University",
    "startDate": "2018-09",
    "endDate": "2020-06",
    "description": "Specialized in AI and Machine Learning"
  }'
```

**Response:** Returns the created qualification with MongoDB `_id`

### Update Qualification

```bash
curl -X PUT http://localhost:5000/api/portfolio/qualifications/QUALIFICATION_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Master of Computer Science (Updated)",
    "institution": "Stanford University",
    "startDate": "2018-09",
    "endDate": "2020-06",
    "description": "Updated description"
  }'
```

### Delete Qualification

```bash
curl -X DELETE http://localhost:5000/api/portfolio/qualifications/QUALIFICATION_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 4. Skills Management

### Add Skill

```bash
curl -X POST http://localhost:5000/api/portfolio/skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "label": "React",
    "level": 95,
    "category": "Frontend"
  }'
```

### Update Skill

```bash
curl -X PUT http://localhost:5000/api/portfolio/skills/SKILL_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "label": "React & Next.js",
    "level": 98,
    "category": "Frontend"
  }'
```

### Delete Skill

```bash
curl -X DELETE http://localhost:5000/api/portfolio/skills/SKILL_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 5. Experience Management

### Add Experience

```bash
curl -X POST http://localhost:5000/api/portfolio/experience \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "company": "Tech Corp",
    "role": "Senior Developer",
    "startDate": "2021-03",
    "endDate": null,
    "current": true,
    "bullets": [
      "Led team of 5 developers",
      "Architected microservices platform",
      "Improved performance by 60%"
    ]
  }'
```

---

## 6. Projects Management

### Add Project

```bash
curl -X POST http://localhost:5000/api/portfolio/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "Full-featured online store with real-time inventory",
    "image": "https://example.com/project.jpg",
    "tags": ["React", "Node.js", "MongoDB"],
    "links": {
      "live": "https://project.com",
      "github": "https://github.com/user/project"
    }
  }'
```

---

## 7. Testimonials Management

### Add Testimonial

```bash
curl -X POST http://localhost:5000/api/portfolio/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Sarah Johnson",
    "role": "Product Manager",
    "company": "Tech Startup",
    "content": "Excellent developer with great attention to detail.",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

---

## 8. Contact & Social

### Update Contact Info

```bash
curl -X PUT http://localhost:5000/api/portfolio/contact \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "location": "San Francisco, CA"
  }'
```

### Update Social Links

```bash
curl -X PUT http://localhost:5000/api/portfolio/social \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "portfolio": "https://johndoe.dev"
  }'
```

---

## 9. Theme Customization

### Update Theme

```bash
curl -X PUT http://localhost:5000/api/portfolio/theme \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "primary": "oklch(0.55 0.25 262)",
    "secondary": "oklch(0.65 0.20 220)",
    "accent": "oklch(0.75 0.18 160)",
    "bg": "oklch(0.98 0.01 260)",
    "surface": "oklch(1.0 0 0)",
    "text": "oklch(0.25 0.02 260)"
  }'
```

---

## 10. Custom Sections

### Add Custom Section

```bash
curl -X POST http://localhost:5000/api/portfolio/custom-sections \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Certifications",
    "fields": [
      {
        "id": "field-1",
        "label": "Certificate Name",
        "name": "name",
        "type": "text",
        "required": true
      },
      {
        "id": "field-2",
        "label": "Organization",
        "name": "org",
        "type": "text",
        "required": true
      }
    ],
    "entries": []
  }'
```

### Add Entry to Custom Section

```bash
curl -X POST http://localhost:5000/api/portfolio/custom-sections/SECTION_ID/entries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "AWS Certified Developer",
    "org": "Amazon Web Services"
  }'
```

---

## Testing with Postman

### 1. Create Collection
- Name: "Portfolio API"
- Base URL: `http://localhost:5000/api`

### 2. Set Environment Variables
- `base_url`: `http://localhost:5000/api`
- `token`: (empty initially)

### 3. After Login
Save the token response to the `token` variable

### 4. Authorization Header
For protected routes, add header:
```
Authorization: Bearer {{token}}
```

---

## Health Check

Test if server is running:

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Portfolio API is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```
**Solution:** Login again to get a new token

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```
**Solution:** Check request body format

### 500 Server Error
```json
{
  "error": "Something went wrong!"
}
```
**Solution:** Check server logs and MongoDB connection

---

## MongoDB Direct Queries

### View All Portfolio Data

```javascript
// In MongoDB shell or Compass
use portfolio;
db.portfolios.find().pretty();
```

### View Users

```javascript
db.users.find().pretty();
```

### Clear All Data

```javascript
db.portfolios.deleteMany({});
```

---

## Debugging Tips

1. **Check server logs** - Look for errors in terminal
2. **Verify MongoDB connection** - Ensure MongoDB is running
3. **Test token** - Decode JWT at jwt.io
4. **Check CORS** - Verify frontend URL in backend config
5. **Validate JSON** - Use JSONLint.com to check request body

---

## Security Best Practices

- ✅ Never commit `.env` file
- ✅ Use strong JWT_SECRET in production
- ✅ Enable HTTPS in production
- ✅ Implement rate limiting
- ✅ Validate all inputs
- ✅ Use MongoDB Atlas IP whitelist
- ✅ Regularly rotate JWT secrets
- ✅ Monitor API access logs

---

**Happy Testing! 🧪**
