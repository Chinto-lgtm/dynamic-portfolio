# 🚀 Dynamic MERN Portfolio

A professional, fully dynamic Personal Portfolio website featuring a secure Admin Dashboard. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with **Bootstrap 5**, allowing you to update all content without touching the code.

## ✨ Features

### 🌐 Public Website
* **Hero Section:** Dynamic role rotation (Typewriter effect) & CV download.
* **About & Profile:** Personal bio with profile image.
* **Experience Timeline:** Professional work history with bullet points.
* **Projects Grid:** Showcase work with images, tags, and live links.
* **Skills:** Visual progress bars for technical expertise.
* **Contact Form:** Functional form that saves messages to the database.
* **Responsive Design:** Fully mobile-friendly using **Bootstrap 5**.

### 🔒 Admin Dashboard
* **Secure Authentication:** JWT-based Login/Logout.
* **Dashboard Overview:** Quick stats on projects and messages.
* **Content Management:** Full Create, Read, Update, Delete (CRUD) for all sections.
* **Message Inbox:** Read and manage contact form submissions.
* **Live Preview:** See changes instantly on the public site.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Bootstrap 5, Lucide Icons.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Mongoose).
* **State Management:** React Context API.
* **Styling:** Bootstrap 5 Utility Classes + Custom CSS.

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (v14 or higher)
* MongoDB (Local or Atlas URL)

### 2. Backend Setup
The backend handles the API and database connection.

```bash
# Go to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file
# Paste the following into .env:
# MONGODB_URI=mongodb://localhost:27017/portfolio
# PORT=5000
# JWT_SECRET=mysecretkey123

# Start the server
npm start