# Configuration Guide

This guide will help you configure the frontend to work with your backend.

## Step 1: Backend URL Configuration

Open `src/services/api.js` and update the API base URL:

```javascript
// Replace this line:
const API_BASE_URL = 'http://localhost:5000/api';

// With your actual backend URL:
const API_BASE_URL = 'https://your-backend-url.com/api';
// or
const API_BASE_URL = 'http://your-ip:5000/api';
```

### Examples:
- Local development: `http://localhost:5000/api`
- Production: `https://api.yourcharity.com/api`
- Custom port: `http://localhost:8080/api`

## Step 2: CORS Configuration (Backend)

Ensure your backend allows requests from your frontend domain. In your backend, configure CORS:

```javascript
// Example for Express.js
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

## Step 3: API Endpoints Verification

Make sure your backend has all these endpoints implemented (matching your route files):

### Authentication
- ✅ `POST /api/auth/login`

### Users (Admin only)
- ✅ `GET /api/users` - Get all users
- ✅ `POST /api/users/create` - Create user
- ✅ `DELETE /api/users/:id` - Delete user

### Campaigns
- ✅ `GET /api/campaigns` - Get all active campaigns (Public)
- ✅ `POST /api/campaigns/create` - Create campaign (Admin)
- ✅ `PUT /api/campaigns/:id` - Update campaign (Admin)
- ✅ `DELETE /api/campaigns/:id` - Delete campaign (Admin)

### Donations
- ✅ `POST /api/donations` - Make donation (Donor)
- ✅ `GET /api/donations/my` - Get user's donations (Donor)
- ✅ `GET /api/donations/all` - Get all donations (Admin)
- ✅ `GET /api/donations/receipt/:id` - Get donation receipt (Donor/Admin)

### Beneficiary
- ✅ `POST /api/beneficiary/submit` - Submit request (Beneficiary)
- ✅ `GET /api/beneficiary/pending` - Get pending requests (Admin)
- ✅ `POST /api/beneficiary/review` - Review request (Admin)

### Volunteer
- ✅ `POST /api/volunteer/assign` - Assign task (Admin)
- ✅ `POST /api/volunteer/submit` - Submit report (Volunteer)
- ✅ `POST /api/volunteer/approve` - Approve task (Admin)

### Dashboard (Admin only)
- ✅ `GET /api/dashboard/stats` - Get platform statistics
- ✅ `GET /api/dashboard/leaderboard` - Get top donors leaderboard
- ✅ `GET /api/dashboard/campaign-stats` - Get campaign statistics

## Step 4: Expected Request/Response Formats

### Login Request
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "role": "donor" // or "admin", "beneficiary", "volunteer"
  }
}
```

### Create Campaign Request (Admin)
```json
POST /api/campaigns
{
  "title": "Education for All",
  "description": "Supporting underprivileged students",
  "category": "Education",
  "targetAmount": 100000,
  "deadline": "2024-12-31"
}
```

### Make Donation Request (Donor)
```json
POST /api/donations
{
  "campaignId": "campaign-id",
  "amount": 1000
}
```

### Donation Response
```json
{
  "message": "Donation successful",
  "donation": {
    "_id": "donation-id",
    "amount": 1000,
    "pointsEarned": 100
  },
  "totalPoints": 500,
  "badge": "Silver"
}
```

## Step 5: JWT Token Handling

The frontend automatically:
1. Stores JWT token in localStorage after login
2. Includes token in Authorization header for all API requests
3. Redirects to login if token expires (401 response)

Your backend should:
1. Validate JWT token on protected routes
2. Include user info (userId, role) in token payload
3. Return 401 status for invalid/expired tokens

Example backend middleware:
```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Step 6: Testing the Integration

1. **Start your backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend**
   ```bash
   cd charity-platform
   npm run dev
   ```

3. **Test login with demo credentials**
   - Email: admin@demo.com
   - Password: demo123

4. **Verify API calls in browser DevTools**
   - Open Network tab
   - Check request/response for each API call
   - Ensure Authorization header is present

## Step 7: Common Issues and Solutions

### Issue: CORS errors
**Solution**: Configure CORS in backend to allow your frontend origin

### Issue: 401 Unauthorized
**Solution**: Check JWT token is being sent in Authorization header

### Issue: Cannot connect to backend
**Solution**: Verify API_BASE_URL is correct and backend is running

### Issue: Missing data in responses
**Solution**: Ensure backend is populating related fields (e.g., campaign details in donations)

## Step 8: Environment-Specific Configuration

For different environments, you can create environment-specific API configurations:

```javascript
// src/services/api.js
const getApiUrl = () => {
  if (import.meta.env.MODE === 'production') {
    return 'https://api.production.com/api';
  }
  if (import.meta.env.MODE === 'staging') {
    return 'https://api.staging.com/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();
```

## Step 9: Payment Gateway Integration (Future)

The frontend is prepared for payment gateway integration. When ready:

1. Update donation flow to include payment processing
2. Add payment success/failure callbacks
3. Integrate with Razorpay/Stripe/PayPal

## Step 10: Deployment Checklist

Before deploying to production:

- [ ] Update API_BASE_URL to production backend URL
- [ ] Test all user flows (login, donate, submit requests, etc.)
- [ ] Verify CORS configuration
- [ ] Check all API endpoints are working
- [ ] Test responsive design on mobile devices
- [ ] Optimize images and assets
- [ ] Enable production build optimizations
- [ ] Set up error monitoring (optional)

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify network requests in DevTools
3. Ensure backend is running and accessible
4. Check CORS configuration
5. Verify JWT token format

---

Happy coding! 🚀
