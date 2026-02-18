# Charity Platform - Frontend

A modern, responsive charity platform frontend built with React, Vite, and TailwindCSS. This application provides a comprehensive interface for donors, beneficiaries, volunteers, and administrators to manage charitable campaigns and donations.

## 🎨 Features

### For Donors
- Browse and donate to active campaigns
- Track donation history with detailed receipts
- Earn points and unlock badges (Bronze, Silver, Gold)
- View leaderboard rankings
- Download donation receipts

### For Beneficiaries
- Submit support requests to campaigns
- Upload verification documents
- Track request status (Pending, Approved, Rejected)
- View request history

### For Volunteers
- View assigned tasks
- Submit task reports
- Track points and badge progression
- Monitor task completion status

### For Admins
- Dashboard with comprehensive analytics
- Create and manage campaigns
- Create and manage users
- View donation statistics with charts
- Manage beneficiary requests
- Approve volunteer tasks
- View top donors leaderboard

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts** - Charts and data visualization
- **Lucide React** - Icon library

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Extract the project files**
   ```bash
   cd charity-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend URL**
   
   Open `src/services/api.js` and update the `API_BASE_URL`:
   ```javascript
   const API_BASE_URL = 'YOUR_BACKEND_URL/api';
   // Example: 'https://your-backend.com/api' or 'http://localhost:5000/api'
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

   The production files will be in the `dist` folder.

## 🎯 Project Structure

```
charity-platform/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Loading.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── CampaignCard.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── DonorDashboard.jsx
│   │   ├── BeneficiaryDashboard.jsx
│   │   └── VolunteerDashboard.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx
│   ├── services/           # API services
│   │   └── api.js
│   ├── utils/              # Helper functions
│   │   └── helpers.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── postcss.config.js      # PostCSS configuration
```

## 🔐 Authentication

The app uses JWT-based authentication. Tokens are stored in localStorage and automatically attached to API requests.

### Demo Credentials
- **Admin**: admin@demo.com / demo123
- **Donor**: donor@demo.com / demo123
- **Beneficiary**: beneficiary@demo.com / demo123
- **Volunteer**: volunteer@demo.com / demo123

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0ea5e9) - Main brand color
- **Secondary**: Purple (#d946ef) - Accent color
- **Neutral**: Gray tones for text and backgrounds
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (system fallback)
- **Headers**: Bold, 2xl-4xl sizes
- **Body**: Regular, sm-base sizes

### Components
All components follow a consistent design pattern with:
- Rounded corners (rounded-lg, rounded-xl)
- Subtle shadows on hover
- Smooth transitions
- Responsive grid layouts

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

Mobile-specific features:
- Collapsible navigation menu
- Stacked layouts for cards and grids
- Touch-friendly buttons and inputs
- Optimized scrolling

## 🔌 API Integration

### Backend Endpoints Required

#### Authentication
- `POST /api/auth/login` - User login

#### Users
- `GET /api/users` - Get all users (Admin)
- `POST /api/users` - Create user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

#### Campaigns
- `GET /api/campaigns` - Get all active campaigns
- `POST /api/campaigns` - Create campaign (Admin)
- `PUT /api/campaigns/:id` - Update campaign (Admin)
- `DELETE /api/campaigns/:id` - Delete campaign (Admin)

#### Donations
- `POST /api/donations` - Make donation (Donor)
- `GET /api/donations/my` - Get user's donations (Donor)
- `GET /api/donations` - Get all donations (Admin)
- `GET /api/donations/receipt/:id` - Get donation receipt

#### Beneficiary
- `POST /api/beneficiary/request` - Submit request (Beneficiary)
- `GET /api/beneficiary/pending` - Get pending requests (Admin)
- `POST /api/beneficiary/review` - Review request (Admin)

#### Volunteer
- `POST /api/volunteer/assign` - Assign task (Admin)
- `POST /api/volunteer/submit` - Submit report (Volunteer)
- `POST /api/volunteer/approve` - Approve task (Admin)

#### Dashboard
- `GET /api/dashboard/stats` - Get platform statistics
- `GET /api/dashboard/top-donors` - Get top donors leaderboard
- `GET /api/dashboard/campaign-stats` - Get campaign statistics

## 🎯 Gamification System

### Points
- Donations: ₹10 = 1 point
- Volunteer tasks: Variable points set by admin

### Badges
- **None**: < 100 points
- **Bronze**: 100-299 points
- **Silver**: 300-599 points
- **Gold**: 600+ points

### Leaderboard
- Ranks top 5 donors by points
- Updates in real-time with donations
- Displays badge status

## 🛠️ Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom primary colors
  }
}
```

### Adding New Routes
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link if needed

### Modifying API Endpoints
Update `src/services/api.js` to match your backend structure.

## 🐛 Troubleshooting

### Development Server Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### API Connection Issues
- Verify backend URL in `src/services/api.js`
- Check CORS settings on backend
- Ensure backend is running

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API integration guide
3. Verify backend compatibility

## 🚀 Deployment

### Vercel
```bash
npm run build
# Deploy dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Other Platforms
The `dist` folder contains static files that can be deployed to any hosting service.

---

Built with ❤️ using React, Vite, and TailwindCSS
