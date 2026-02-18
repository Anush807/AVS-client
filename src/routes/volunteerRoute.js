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