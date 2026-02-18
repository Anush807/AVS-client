# Missing Backend Endpoints - Implementation Guide

The frontend is ready to work with additional endpoints that allow volunteers and beneficiaries to view their own data. Here's what needs to be added to your backend:

## 🔧 Required Backend Changes

### 1. Volunteer Endpoints

#### A. Get Volunteer's Own Tasks
**Location:** `controllers/volunteerController.js`

Add this function:

```javascript
// Volunteer gets their own tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find({ 
      volunteerId: req.user.userId 
    })
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
```

#### B. Get All Tasks (Admin)
**Location:** `controllers/volunteerController.js`

Add this function:

```javascript
// Admin gets all volunteer tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find()
      .populate('volunteerId', 'name email')
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
```

#### C. Update Routes
**Location:** `routes/volunteerRoute.js`

Add these routes:

```javascript
const {
  assignTask,
  submitReport,
  approveTask,
  getMyTasks,      // ADD THIS
  getAllTasks,     // ADD THIS
} = require("../controllers/volunteerController");

// ... existing routes ...

// Volunteer gets own tasks
router.get(
  "/my-tasks",
  authMiddleware(["volunteer"]),
  getMyTasks
);

// Admin gets all tasks
router.get(
  "/tasks",
  authMiddleware(["admin"]),
  getAllTasks
);
```

---

### 2. Beneficiary Endpoints

#### A. Get Beneficiary's Own Requests
**Location:** `controllers/benificieryController.js`

Add this function:

```javascript
// Beneficiary gets their own requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BeneficiaryRequest.find({ 
      beneficiaryId: req.user.userId 
    })
      .populate('campaignId', 'title category')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
```

#### B. Get All Requests (Admin)
**Location:** `controllers/benificieryController.js`

Add this function:

```javascript
// Admin gets all beneficiary requests (not just pending)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BeneficiaryRequest.find()
      .populate('beneficiaryId', 'name email')
      .populate('campaignId', 'title category')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
```

#### C. Update Routes
**Location:** `routes/benificieryRoute.js`

Add these routes:

```javascript
const {
  submitRequest,
  getPendingRequests,
  reviewRequest,
  getMyRequests,    // ADD THIS
  getAllRequests,   // ADD THIS
} = require("../controllers/benificieryController");

// ... existing routes ...

// Beneficiary gets own requests
router.get(
  "/my-requests",
  authMiddleware(["beneficiary"]),
  getMyRequests
);

// Admin gets all requests (pending + approved + rejected)
router.get(
  "/all",
  authMiddleware(["admin"]),
  getAllRequests
);
```

---

## 📋 Complete Updated Files

### Updated `volunteerController.js`

```javascript
const VolunteerTask = require("../models/VolunteerTask");
const User = require("../models/User");

// Badge logic (reuse)
const calculateBadge = (points) => {
  if (points >= 600) return "Gold";
  if (points >= 300) return "Silver";
  if (points >= 100) return "Bronze";
  return "None";
};

// Admin assigns task
exports.assignTask = async (req, res) => {
  try {
    const { volunteerId, title, description } = req.body;

    const task = await VolunteerTask.create({
      volunteerId,
      title,
      description,
      assignedBy: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign task" });
  }
};

// Volunteer submits report
exports.submitReport = async (req, res) => {
  try {
    const { taskId, reportUrl } = req.body;

    const task = await VolunteerTask.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.reportUrl = reportUrl;
    task.status = "submitted";
    await task.save();

    res.json({ message: "Report submitted" });
  } catch (error) {
    res.status(500).json({ message: "Submission failed" });
  }
};

// Admin approves task
exports.approveTask = async (req, res) => {
  try {
    const { taskId, points } = req.body;

    const task = await VolunteerTask.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "approved";
    task.pointsEarned = points;
    await task.save();

    // Update volunteer points
    const user = await User.findById(task.volunteerId);
    user.points += points;
    user.badge = calculateBadge(user.points);
    await user.save();

    res.json({
      message: "Task approved",
      totalPoints: user.points,
      badge: user.badge,
    });
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};

// NEW: Volunteer gets their own tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find({ 
      volunteerId: req.user.userId 
    })
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// NEW: Admin gets all volunteer tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find()
      .populate('volunteerId', 'name email')
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
```

### Updated `volunteerRoute.js`

```javascript
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  assignTask,
  submitReport,
  approveTask,
  getMyTasks,
  getAllTasks,
} = require("../controllers/volunteerController");

// Admin assigns
router.post(
  "/assign",
  authMiddleware(["admin"]),
  assignTask
);

// Volunteer submits
router.post(
  "/submit",
  authMiddleware(["volunteer"]),
  submitReport
);

// Admin approves
router.post(
  "/approve",
  authMiddleware(["admin"]),
  approveTask
);

// NEW: Volunteer gets own tasks
router.get(
  "/my-tasks",
  authMiddleware(["volunteer"]),
  getMyTasks
);

// NEW: Admin gets all tasks
router.get(
  "/tasks",
  authMiddleware(["admin"]),
  getAllTasks
);

module.exports = router;
```

### Updated `benificieryController.js`

```javascript
const BeneficiaryRequest = require("../models/BenificieryRequest");
const Campaign = require("../models/Campaign");

// Submit request (Beneficiary only)
exports.submitRequest = async (req, res) => {
  try {
    const { campaignId, requestMessage, documentUrl } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(400).json({ message: "Invalid campaign" });
    }

    const request = await BeneficiaryRequest.create({
      beneficiaryId: req.user.userId,
      campaignId,
      requestMessage,
      documentUrl,
    });

    res.status(201).json({
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit request" });
  }
};

// Admin: get all pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await BeneficiaryRequest.find({ status: "pending" })
      .populate("beneficiaryId", "name email")
      .populate("campaignId", "title");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// Admin: approve or reject
exports.reviewRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body; // action = approved/rejected

    const request = await BeneficiaryRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = action;
    request.reviewedBy = req.user.userId;
    request.reviewedAt = new Date();

    await request.save();

    res.json({ message: `Request ${action}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to review request" });
  }
};

// NEW: Beneficiary gets their own requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BeneficiaryRequest.find({ 
      beneficiaryId: req.user.userId 
    })
      .populate('campaignId', 'title category')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// NEW: Admin gets all beneficiary requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BeneficiaryRequest.find()
      .populate('beneficiaryId', 'name email')
      .populate('campaignId', 'title category')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
```

### Updated `benificieryRoute.js`

```javascript
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitRequest,
  getPendingRequests,
  reviewRequest,
  getMyRequests,
  getAllRequests,
} = require("../controllers/benificieryController");

// Beneficiary submits
router.post(
  "/submit",
  authMiddleware(["beneficiary"]),
  submitRequest
);

// Admin views pending
router.get(
  "/pending",
  authMiddleware(["admin"]),
  getPendingRequests
);

// Admin approves/rejects
router.post(
  "/review",
  authMiddleware(["admin"]),
  reviewRequest
);

// NEW: Beneficiary gets own requests
router.get(
  "/my-requests",
  authMiddleware(["beneficiary"]),
  getMyRequests
);

// NEW: Admin gets all requests
router.get(
  "/all",
  authMiddleware(["admin"]),
  getAllRequests
);

module.exports = router;
```

---

## ✅ Testing Checklist

After adding these endpoints:

### Volunteer Testing
1. ✅ Admin assigns task to volunteer
2. ✅ Volunteer logs in and sees their tasks at `/volunteer/my-tasks`
3. ✅ Volunteer submits report
4. ✅ Admin approves task
5. ✅ Volunteer's points and badge update correctly

### Beneficiary Testing
1. ✅ Beneficiary submits request
2. ✅ Beneficiary sees their requests at `/beneficiary/my-requests`
3. ✅ Admin reviews request (approve/reject)
4. ✅ Beneficiary sees updated status

### Admin Testing
1. ✅ Admin sees all tasks at `/volunteer/tasks`
2. ✅ Admin sees all requests at `/beneficiary/all`

---

## 🚨 Important Notes

1. **Frontend Already Handles Missing Endpoints**
   - If these endpoints don't exist yet, the frontend will gracefully show empty states
   - No errors will crash the app

2. **User Model Already Supports Points/Badges**
   - Both volunteers and beneficiaries have `points` and `badge` fields
   - The gamification system works for all user types

3. **Backward Compatible**
   - Adding these endpoints won't break existing functionality
   - They're additional GET endpoints that enhance the user experience

---

## 📝 Summary

**Add to Backend:**
- 2 new controller functions in `volunteerController.js`
- 2 new routes in `volunteerRoute.js`
- 2 new controller functions in `benificieryController.js`
- 2 new routes in `benificieryRoute.js`

**Frontend is Already Updated:**
- Volunteer Dashboard will automatically fetch and display tasks
- Beneficiary Dashboard will automatically fetch and display requests
- Admin can see all tasks and requests
- Graceful fallbacks if endpoints don't exist yet

---

**Once you add these endpoints, the complete system will be fully functional!** 🎉
