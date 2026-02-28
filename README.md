# 🤝 Helping Hands - Charity Platform

Complete end-to-end guide to run the Helping Hands charity platform locally.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Overview](#project-overview)
3. [Installation](#installation)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Testing the Application](#testing-the-application)
8. [User Roles & Features](#user-roles--features)
9. [Troubleshooting](#troubleshooting)
10. [Project Structure](#project-structure)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB** (Two options):
   - **Option A (Recommended):** MongoDB Atlas (Cloud - Free)
   - **Option B:** Local MongoDB Installation
     - Download: https://www.mongodb.com/try/download/community

3. **Git**
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

4. **Code Editor** (Recommended: VS Code)
   - Download: https://code.visualstudio.com/

---

## 🎯 Project Overview

**Helping Hands** is a modern charity platform with:
- ✅ Role-based dashboards (Admin, Donor, Volunteer, Beneficiary)
- ✅ Campaign management
- ✅ Donation tracking with gamification
- ✅ Points & badges system
- ✅ Real-time leaderboards
- ✅ Volunteer task management
- ✅ Beneficiary request system

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
# Clone your repository (replace with your actual repo URL)
git clone https://github.com/yourusername/helping-hands.git

# Navigate to project directory
cd helping-hands
```

**Project Structure:**
```
helping-hands/
├── backend/          # Node.js + Express backend
└── frontend/         # React + Vite frontend
```

---

## 🗄️ Backend Setup

### Step 1: Navigate to Backend

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### Step 3: Setup MongoDB

#### Option A: MongoDB Atlas (Recommended - Free Cloud Database)

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose **FREE** tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `helpinghandsuser`
   - Password: Create strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy connection string:
     ```
     mongodb+srv://helpinghandsuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add database name: `helping-hands`
     ```
     mongodb+srv://helpinghandsuser:YourPassword@cluster0.xxxxx.mongodb.net/helping-hands?retryWrites=true&w=majority
     ```

#### Option B: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/helping-hands`

### Step 4: Create Environment Variables

Create a `.env` file in the `backend` folder:

```bash
# In backend folder
touch .env
```

Add the following content:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://helpinghandsuser:YourPassword@cluster0.xxxxx.mongodb.net/helping-hands?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-64-character-string

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# Frontend URL (for CORS)
VITE_API_URL=http://localhost:5173
```

**Generate JWT Secret:**
```bash
# Run this command to generate a secure secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

### Step 5: Verify Backend Files

Ensure you have these files in your backend folder:

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── campaignController.js    # Campaign management
│   ├── donationController.js    # Donation handling
│   ├── dashboardController.js   # Dashboard stats
│   ├── benificieryController.js # Beneficiary requests
│   └── volunteerController.js   # Volunteer tasks
├── models/
│   ├── User.js                  # User model
│   ├── Campaign.js              # Campaign model
│   ├── Donation.js              # Donation model
│   ├── BenificieryRequest.js    # Beneficiary request model
│   └── VolunteerTask.js         # Volunteer task model
├── routes/
│   ├── authRoutes.js            # Auth routes
│   ├── campaignRoutes.js        # Campaign routes
│   ├── donationRoute.js         # Donation routes
│   ├── dashboardRoute.js        # Dashboard routes
│   ├── benificieryRoute.js      # Beneficiary routes
│   ├── volunteerRoute.js        # Volunteer routes
│   └── userRoute.js             # User management routes
├── middleware/
│   └── authMiddleware.js        # JWT verification
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
└── server.js                    # Main server file
```

### Step 6: Test Backend

```bash
# Start the backend server
npm start
```

**Expected Output:**
```
🚀 Server running on port 5000
📊 Environment: development
✅ MongoDB Connected
🌐 CORS enabled for local development
```

**Test in browser:**
Open: http://localhost:5000

Should see:
```json
{
  "message": "Backend is running 🚀",
  "status": "healthy",
  "environment": "development",
  "timestamp": "2024-02-28T..."
}
```

**Leave this terminal running!**

---

## 🎨 Frontend Setup

### Step 1: Open New Terminal

Keep backend running, open a **new terminal**.

### Step 2: Navigate to Frontend

```bash
cd frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- lucide-react (icons)
- recharts (charts)
- tailwindcss
- vite

### Step 4: Configure API URL

Open `src/services/api.js`:

**Line 4:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

✅ This should already be correct for local development!

### Step 5: Verify Frontend Files

Ensure you have these key files:

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CampaignCard.jsx
│   │   ├── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Tracking.jsx
│   │   ├── Campaigns.jsx
│   │   ├── Community.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── DonorDashboard.jsx
│   │   ├── BeneficiaryDashboard.jsx
│   │   └── VolunteerDashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Step 6: Start Frontend

```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🚀 Running the Application

### You Need TWO Terminals Running:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Running on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Running on: http://localhost:5173

### Access the Application:

Open your browser: **http://localhost:5173**

---

## 🧪 Testing the Application

### 1. Test Home Page

- Visit: http://localhost:5173
- Should see: Hero section, feature cards, stats
- Click feature cards to navigate to different pages

### 2. Test Registration

**Register as Donor:**
```
1. Click "Get Started" or go to /register
2. Select "Donor"
3. Fill form:
   - Name: Test Donor
   - Email: donor@test.com
   - Password: test123
4. Click "Create Account"
5. Should auto-login and redirect to Donor Dashboard
```

**Register as Volunteer:**
```
1. Go to /register
2. Select "Volunteer"
3. Fill form with different email
4. Should redirect to Volunteer Dashboard
```

**Register as Beneficiary:**
```
1. Go to /register
2. Select "Beneficiary"
3. Fill form with different email
4. Should redirect to Beneficiary Dashboard
```

### 3. Test Login

**Default Admin Account:**
```
Email: admin@demo.com
Password: demo123
```

**Your Created Accounts:**
```
Email: donor@test.com
Password: test123
```

### 4. Test Features

**As Admin:**
- ✅ Create campaigns
- ✅ Create users
- ✅ View donations
- ✅ Approve beneficiary requests
- ✅ Approve volunteer tasks
- ✅ View leaderboard

**As Donor:**
- ✅ View campaigns
- ✅ Make donations
- ✅ Earn points
- ✅ View donation history
- ✅ Download receipts
- ✅ See leaderboard rank

**As Volunteer:**
- ✅ View assigned tasks
- ✅ Submit reports
- ✅ Earn points
- ✅ Track badge progression

**As Beneficiary:**
- ✅ Submit support requests
- ✅ Upload documents
- ✅ Track request status

---

## 👥 User Roles & Features

### Admin
**Login:** admin@demo.com / demo123

**Can do:**
- Create/edit/delete campaigns
- Create users of any role
- View all donations
- Approve/reject beneficiary requests
- Assign tasks to volunteers
- Approve volunteer tasks with points
- View platform statistics

### Donor
**Register at:** /register

**Can do:**
- Browse active campaigns
- Make donations
- Earn points (₹10 = 1 point)
- Unlock badges (Bronze, Silver, Gold)
- View donation history
- Download receipts
- See leaderboard ranking

### Volunteer
**Register at:** /register

**Can do:**
- View assigned tasks
- Submit task reports
- Earn points when tasks approved
- Track badge progression
- See points breakdown

### Beneficiary
**Register at:** /register

**Can do:**
- Submit support requests to campaigns
- Upload verification documents
- Track request status
- View request history

---

## 🐛 Troubleshooting

### Backend Issues

**Issue: "MongoDB connection failed"**
```bash
# Check:
1. MongoDB Atlas cluster is running
2. IP is whitelisted (0.0.0.0/0)
3. MONGO_URI in .env is correct
4. Database user password is correct
```

**Issue: "Port 5000 already in use"**
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <process-id> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Or change port in .env:
PORT=5001
```

**Issue: "JWT must be provided"**
```bash
# Check .env has JWT_SECRET
# Restart backend after adding it
```

### Frontend Issues

**Issue: "CORS error"**
```bash
# Backend must be running
# Check CORS in server.js allows localhost:5173
# Restart backend if you changed server.js
```

**Issue: "Network Error"**
```bash
# Backend not running
# Start backend: cd backend && npm start
```

**Issue: "Cannot connect to http://localhost:5000"**
```bash
# Check API_BASE_URL in src/services/api.js
# Should be: http://localhost:5000/api
```

**Issue: "Page not found"**
```bash
# Check App.jsx has route defined
# Restart frontend: Ctrl+C then npm run dev
```

### Database Issues

**Issue: "No campaigns showing"**
```bash
# Login as admin
# Create a campaign from Admin Dashboard
# Make sure status is "active"
```

**Issue: "Points not updating"**
```bash
# Check browser console for errors
# Make sure backend endpoints are working
# Test API: http://localhost:5000/api/donations
```

---

## 📁 Project Structure

### Backend Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection config
├── controllers/                 # Business logic
│   ├── authController.js        # Login, registration
│   ├── campaignController.js    # CRUD campaigns
│   ├── donationController.js    # Process donations
│   ├── dashboardController.js   # Stats, leaderboard
│   ├── benificieryController.js # Beneficiary requests
│   └── volunteerController.js   # Volunteer tasks
├── models/                      # Database schemas
│   ├── User.js                  # Users (all roles)
│   ├── Campaign.js              # Campaigns
│   ├── Donation.js              # Donations
│   ├── BenificieryRequest.js    # Support requests
│   └── VolunteerTask.js         # Volunteer tasks
├── routes/                      # API endpoints
│   ├── authRoutes.js            # /api/auth/*
│   ├── campaignRoutes.js        # /api/campaigns/*
│   ├── donationRoute.js         # /api/donations/*
│   ├── dashboardRoute.js        # /api/dashboard/*
│   ├── benificieryRoute.js      # /api/beneficiary/*
│   ├── volunteerRoute.js        # /api/volunteer/*
│   └── userRoute.js             # /api/users/*
├── middleware/
│   └── authMiddleware.js        # JWT verification
├── .env                         # Environment variables
├── package.json                 # Dependencies
└── server.js                    # Main entry point
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/              # Reusable components
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── CampaignCard.jsx    # Campaign display card
│   │   ├── Loading.jsx         # Loading spinner
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication state
│   ├── pages/                   # Page components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Tracking.jsx        # Donation tracking
│   │   ├── Campaigns.jsx       # Browse campaigns
│   │   ├── Community.jsx       # Community page
│   │   ├── AdminDashboard.jsx  # Admin panel
│   │   ├── DonorDashboard.jsx  # Donor panel
│   │   ├── BeneficiaryDashboard.jsx  # Beneficiary panel
│   │   └── VolunteerDashboard.jsx    # Volunteer panel
│   ├── services/
│   │   └── api.js              # Axios API calls
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind configuration
```

---

## 🔑 Key Technologies

### Backend:
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend:
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Charts

---

## 📝 Environment Variables Reference

### Backend (.env)

```env
# Required
MONGO_URI=mongodb+srv://...        # MongoDB connection string
JWT_SECRET=your-secret-key         # JWT signing key (64+ chars)
PORT=5000                          # Server port

# Optional
NODE_ENV=development               # Environment mode
VITE_API_URL=http://localhost:5173  # Frontend URL for CORS
```

---

## 🎯 Quick Commands Reference

### Backend Commands
```bash
cd backend
npm install                 # Install dependencies
npm start                   # Start server
npm run dev                 # Start with nodemon (if configured)
```

### Frontend Commands
```bash
cd frontend
npm install                 # Install dependencies
npm run dev                 # Start dev server
npm run build               # Build for production
npm run preview             # Preview production build
```

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] MongoDB Atlas account created
- [ ] Backend .env file configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can register new users
- [ ] Can login with demo admin account
- [ ] Can create campaigns as admin
- [ ] Can donate as donor
- [ ] Points and badges working

---

## 🆘 Getting Help

### Common Issues:
1. **CORS Error** → Check backend server.js CORS config
2. **MongoDB Error** → Verify MONGO_URI and IP whitelist
3. **Port Conflict** → Change PORT in .env
4. **Module Not Found** → Run npm install in correct folder

### Debug Steps:
1. Check both terminals are running
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console (F12) for errors
4. Check backend terminal for error logs
5. Verify .env file exists and is correct

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review error messages in console
3. Verify all installation steps completed
4. Check that both backend and frontend are running

---

## 🎊 You're All Set!

Your Helping Hands charity platform is now running locally!

**Access at:** http://localhost:5173

**Happy coding!** 🚀
