# Quick Start Guide - Charity Platform Frontend

Get your charity platform frontend up and running in 5 minutes!

## 📋 Prerequisites

- Node.js v16+ installed
- Your backend server URL ready

## 🚀 Quick Setup

### 1. Install Dependencies (1 minute)

```bash
cd charity-platform
npm install
```

### 2. Configure Backend URL (30 seconds)

Open `src/services/api.js` and replace line 4:

```javascript
const API_BASE_URL = 'YOUR_BACKEND_URL_HERE/api';
```

**Examples:**
- Local: `http://localhost:5000/api`
- Remote: `https://your-backend.com/api`

### 3. Start Development Server (30 seconds)

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🎯 Test the Application

### Login with Demo Credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.com | demo123 |
| Donor | donor@demo.com | demo123 |
| Beneficiary | beneficiary@demo.com | demo123 |
| Volunteer | volunteer@demo.com | demo123 |

## ✅ What You Get

### Admin Features
- ✅ Dashboard with analytics and charts
- ✅ Create/manage campaigns
- ✅ Create/manage users
- ✅ View all donations
- ✅ Review beneficiary requests
- ✅ Approve volunteer tasks

### Donor Features
- ✅ Browse active campaigns
- ✅ Make donations with points/badges
- ✅ View donation history
- ✅ Download receipts
- ✅ See leaderboard ranking

### Beneficiary Features
- ✅ Submit support requests
- ✅ Upload verification documents
- ✅ Track request status

### Volunteer Features
- ✅ View assigned tasks
- ✅ Submit task reports
- ✅ Track points and badges
- ✅ Monitor progress

## 🎨 Design Features

- ✅ Clean, modern UI with blue color scheme
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Interactive charts and visualizations
- ✅ Real-time point calculations
- ✅ Badge system (Bronze, Silver, Gold)

## 📱 Mobile Responsive

The app automatically adapts to:
- 📱 Mobile phones (< 768px)
- 💻 Tablets (768px - 1023px)
- 🖥️ Desktops (1024px+)

## 🔧 Build for Production

```bash
npm run build
```

Output will be in the `dist` folder - ready to deploy!

## 🌐 Deploy to Production

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify
1. Drag and drop `dist` folder
2. Or connect GitHub repo

### Other Platforms
Upload contents of `dist` folder to any static hosting.

## 🆘 Troubleshooting

### Can't connect to backend?
- ✅ Check `src/services/api.js` has correct URL
- ✅ Ensure backend is running
- ✅ Verify CORS is enabled on backend

### Login not working?
- ✅ Check backend `/api/auth/login` endpoint
- ✅ Verify credentials in backend database
- ✅ Check browser console for errors

### Pages are blank?
- ✅ Check browser console for errors
- ✅ Verify all npm packages installed
- ✅ Try clearing cache: `rm -rf node_modules && npm install`

## 📚 Need More Help?

- Read `README.md` for full documentation
- Check `CONFIGURATION_GUIDE.md` for detailed setup
- Review `src/services/api.js` for API structure

## 🎉 You're All Set!

Your charity platform frontend is now running. Start by:
1. Logging in as admin
2. Creating some campaigns
3. Creating donor/beneficiary/volunteer users
4. Testing the complete flow

Happy coding! 💙
