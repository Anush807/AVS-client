# API Endpoints Mapping

This document maps the frontend API calls to your exact backend routes.

## ✅ Complete Route Mapping

### Authentication Routes (`/api/auth`)
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `authAPI.login()` | `/api/auth/login` | POST | No |

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "role": "donor"
  }
}
```

---

### User Routes (`/api/users`) - Admin Only
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `userAPI.getUsers()` | `/api/users` | GET | Admin |
| `userAPI.createUser()` | `/api/users/create` | POST | Admin |
| `userAPI.deleteUser(id)` | `/api/users/:id` | DELETE | Admin |

**Create User Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor"
}
```

---

### Campaign Routes (`/api/campaigns`)
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `campaignAPI.getCampaigns()` | `/api/campaigns` | GET | No (Public) |
| `campaignAPI.createCampaign()` | `/api/campaigns/create` | POST | Admin |
| `campaignAPI.updateCampaign(id, data)` | `/api/campaigns/:id` | PUT | Admin |
| `campaignAPI.deleteCampaign(id)` | `/api/campaigns/:id` | DELETE | Admin |

**Create Campaign Request:**
```json
{
  "title": "Education for All",
  "description": "Supporting underprivileged students",
  "category": "Education",
  "targetAmount": 100000,
  "deadline": "2024-12-31"
}
```

**Expected Response:**
```json
{
  "_id": "campaign-id",
  "title": "Education for All",
  "description": "Supporting underprivileged students",
  "category": "Education",
  "targetAmount": 100000,
  "collectedAmount": 0,
  "status": "active",
  "deadline": "2024-12-31",
  "createdBy": "admin-user-id"
}
```

---

### Donation Routes (`/api/donations`)
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `donationAPI.makeDonation()` | `/api/donations` | POST | Donor |
| `donationAPI.getMyDonations()` | `/api/donations/my` | GET | Donor |
| `donationAPI.getAllDonations()` | `/api/donations/all` | GET | Admin |
| `donationAPI.getReceipt(id)` | `/api/donations/receipt/:id` | GET | Donor/Admin |

**Make Donation Request:**
```json
{
  "campaignId": "campaign-id",
  "amount": 1000
}
```

**Make Donation Response:**
```json
{
  "message": "Donation successful",
  "donation": {
    "_id": "donation-id",
    "donorId": "user-id",
    "campaignId": "campaign-id",
    "amount": 1000,
    "pointsEarned": 100,
    "donatedAt": "2024-01-15T10:00:00.000Z"
  },
  "totalPoints": 500,
  "badge": "Silver"
}
```

**Get My Donations Response:**
```json
[
  {
    "_id": "donation-id",
    "amount": 1000,
    "pointsEarned": 100,
    "donatedAt": "2024-01-15T10:00:00.000Z",
    "campaignId": {
      "_id": "campaign-id",
      "title": "Education for All",
      "category": "Education"
    }
  }
]
```

---

### Beneficiary Routes (`/api/beneficiary`)
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `beneficiaryAPI.submitRequest()` | `/api/beneficiary/submit` | POST | Beneficiary |
| `beneficiaryAPI.getPendingRequests()` | `/api/beneficiary/pending` | GET | Admin |
| `beneficiaryAPI.reviewRequest()` | `/api/beneficiary/review` | POST | Admin |

**Submit Request:**
```json
{
  "campaignId": "campaign-id",
  "requestMessage": "I need support for my child's education",
  "documentUrl": "https://example.com/document.pdf"
}
```

**Review Request:**
```json
{
  "requestId": "request-id",
  "action": "approved"
}
```

---

### Volunteer Routes (`/api/volunteer`)
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `volunteerAPI.assignTask()` | `/api/volunteer/assign` | POST | Admin |
| `volunteerAPI.submitReport()` | `/api/volunteer/submit` | POST | Volunteer |
| `volunteerAPI.approveTask()` | `/api/volunteer/approve` | POST | Admin |

**Assign Task (Admin):**
```json
{
  "volunteerId": "volunteer-user-id",
  "title": "Organize Food Drive",
  "description": "Coordinate food collection in local area"
}
```

**Submit Report (Volunteer):**
```json
{
  "taskId": "task-id",
  "reportUrl": "https://example.com/report.pdf"
}
```

**Approve Task (Admin):**
```json
{
  "taskId": "task-id",
  "points": 50
}
```

**Approve Task Response:**
```json
{
  "message": "Task approved",
  "totalPoints": 250,
  "badge": "Bronze"
}
```

---

### Dashboard Routes (`/api/dashboard`) - Admin Only
| Frontend Call | Backend Route | Method | Auth Required |
|--------------|---------------|--------|---------------|
| `dashboardAPI.getStats()` | `/api/dashboard/stats` | GET | Admin |
| `dashboardAPI.getTopDonors()` | `/api/dashboard/leaderboard` | GET | Admin |
| `dashboardAPI.getCampaignStats()` | `/api/dashboard/campaign-stats` | GET | Admin |

**Get Stats Response:**
```json
{
  "totalDonations": 500000,
  "totalCampaigns": 25,
  "approvedBeneficiaries": 150
}
```

**Get Top Donors Response:**
```json
[
  {
    "_id": "user-id",
    "name": "John Doe",
    "points": 1000,
    "badge": "Gold"
  }
]
```

**Get Campaign Stats Response:**
```json
[
  {
    "_id": "campaign-id",
    "campaignTitle": "Education for All",
    "totalAmount": 50000
  }
]
```

---

## Important Notes

### 1. **Authentication Header**
All authenticated routes require JWT token in header:
```
Authorization: Bearer <jwt-token>
```

The frontend automatically adds this header for all requests after login.

### 2. **Route Differences from Standard REST**

The backend uses custom route paths:
- ❌ NOT: `/api/users` (POST)
- ✅ USE: `/api/users/create` (POST)

- ❌ NOT: `/api/campaigns` (POST)
- ✅ USE: `/api/campaigns/create` (POST)

- ❌ NOT: `/api/donations` (GET all)
- ✅ USE: `/api/donations/all` (GET)

- ❌ NOT: `/api/dashboard/top-donors`
- ✅ USE: `/api/dashboard/leaderboard`

### 3. **Populated Fields**

Some endpoints use Mongoose `.populate()` to include related data:

**Donations** should populate:
- `donorId` with `name` and `email`
- `campaignId` with `title` and `category`

**Beneficiary Requests** should populate:
- `beneficiaryId` with `name` and `email`
- `campaignId` with `title`

### 4. **Points & Badge Calculation**

Backend handles:
- Points: `Math.floor(amount / 10)` (₹10 = 1 point)
- Badges:
  - None: < 100 points
  - Bronze: 100-299 points
  - Silver: 300-599 points
  - Gold: 600+ points

### 5. **CORS Configuration**

Your `server.js` already has:
```javascript
app.use(cors());
```

For production, update to:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

---

## Quick Test Checklist

✅ Login works and returns token + user
✅ Token is sent in Authorization header
✅ Admin can create campaigns at `/campaigns/create`
✅ Admin can create users at `/users/create`
✅ Donors can make donations at `/donations`
✅ Donors can view history at `/donations/my`
✅ Admin can view all donations at `/donations/all`
✅ Dashboard stats load at `/dashboard/stats`
✅ Leaderboard loads at `/dashboard/leaderboard`

---

**All routes are now perfectly matched between frontend and backend!** ✅
