# Helping Hands - Frontend

A modern, responsive donation platform built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Admin Portal
- 🔐 Secure admin login
- 👥 User management (Donors, Volunteers, Beneficiaries)
- 🎯 Campaign creation and management
- ✅ Beneficiary request approval
- 💰 Donation monitoring
- 📊 Dashboard analytics with charts
- 🏆 Leaderboard tracking
- 📈 Fund utilization analytics

### Donor Portal
- 🔐 Secure donor login
- 💝 Browse and donate to campaigns
- 🏅 Gamification system (points, badges, levels)
- 📜 View donation history
- 📥 Download donation receipts
- 📊 Personal donation analytics
- 🏆 View leaderboards

### Gamification System
- ⭐ Points for donations (₹10 = 1 point)
- 🏅 Badge progression (Bronze → Silver → Gold)
  - Bronze: 100 points
  - Silver: 300 points
  - Gold: 600 points
- 📈 Level-based progression
- 🏆 Leaderboard rankings

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Setup Steps

1. **Clone the repository**
   ```bash
   cd helping-hands-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your backend API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will run on `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 UI Features

### Responsive Design
- Mobile-first approach
- Fully responsive on all devices
- Touch-friendly interfaces
- Smooth animations and transitions

### Modern Components
- Clean card-based layouts
- Interactive charts and graphs
- Progress bars for campaigns
- Badge system for gamification
- Modal dialogs for forms
- Smooth page transitions

### Color Scheme
- Primary: Blue (#0ea5e9)
- Success: Green
- Warning: Orange
- Error: Red
- Info: Purple

## 📱 Pages Overview

### Public
- **Login Page:** Secure authentication with demo credentials

### Admin Dashboard
- **Overview:** Key metrics and statistics
- **Campaigns:** Create, edit, and delete campaigns
- **Users:** Add and manage users
- **Donations:** View all donation transactions
- **Beneficiaries:** Review and approve requests
- **Volunteers:** Manage volunteer tasks
- **Analytics:** Charts showing campaign performance

### Donor Dashboard
- **Overview:** Personal donation stats and badge progress
- **Campaigns:** Browse and donate to active campaigns
- **Donations:** View history and download receipts
- **Leaderboard:** See top donors and your ranking

## 🔐 Authentication

The app uses JWT-based authentication:
- Token stored in localStorage
- Automatic token refresh
- Protected routes by role
- Auto-redirect on logout

### Demo Credentials

**Admin:**
- Email: admin@demo.com
- Password: admin123

**Donor:**
- Email: donor@demo.com
- Password: donor123

## 🎯 API Integration

The frontend integrates with the following backend endpoints:

### Auth
- `POST /api/auth/login` - User login

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns/create` - Create campaign (Admin)
- `PUT /api/campaigns/:id` - Update campaign (Admin)
- `DELETE /api/campaigns/:id` - Delete campaign (Admin)

### Donations
- `POST /api/donations` - Make donation (Donor)
- `GET /api/donations/my` - Get user donations (Donor)
- `GET /api/donations/all` - Get all donations (Admin)
- `GET /api/donations/receipt/:id` - Get donation receipt

### Users
- `GET /api/users` - Get all users (Admin)
- `POST /api/users/create` - Create user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/leaderboard` - Get top donors
- `GET /api/dashboard/campaign-stats` - Get campaign analytics

## 📊 Charts and Analytics

The dashboard includes:
- **Bar Charts:** Campaign performance comparison
- **Pie Charts:** Campaign distribution
- **Area Charts:** Donation trends over time
- **Progress Bars:** Campaign funding progress
- **Leaderboards:** Top donor rankings

## 🎮 Gamification

### Point System
- ₹10 donated = 1 point
- Points accumulate with each donation
- Real-time point updates

### Badge Tiers
1. **None** (0-99 points) - Gray
2. **Bronze** (100-299 points) - Orange
3. **Silver** (300-599 points) - Silver
4. **Gold** (600+ points) - Gold

### Progress Tracking
- Visual progress bars for each badge tier
- Points to next badge displayed
- Achievement notifications

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Components
All components are in `src/components/`:
- `Navbar.jsx` - Navigation bar
- `StatCard.jsx` - Statistics cards
- `Badge.jsx` - Gamification badges
- `ProtectedRoute.jsx` - Route protection

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### Environment Variables
Set the following in your hosting platform:
- `VITE_API_URL` - Your production API URL

## 📝 Project Structure

```
src/
├── api/
│   └── axios.js           # API configuration
├── components/
│   ├── Navbar.jsx         # Navigation component
│   ├── StatCard.jsx       # Statistics card
│   ├── Badge.jsx          # Badge component
│   └── ProtectedRoute.jsx # Route protection
├── context/
│   └── AuthContext.jsx    # Authentication context
├── pages/
│   ├── Login.jsx          # Login page
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminCampaigns.jsx
│   │   └── AdminUsers.jsx
│   └── donor/
│       ├── DonorDashboard.jsx
│       ├── DonorCampaigns.jsx
│       └── DonorDonations.jsx
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check if backend server is running
   - Verify VITE_API_URL in .env file
   - Check CORS settings on backend

2. **Login Issues**
   - Clear browser localStorage
   - Check network tab for API errors
   - Verify credentials

3. **Charts Not Displaying**
   - Ensure recharts is installed
   - Check if data is being fetched correctly
   - Verify component imports

## 📄 License

This project is part of the Helping Hands platform.

## 🤝 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors

## 🎉 Acknowledgments

Built with modern web technologies to create a seamless donation experience.
