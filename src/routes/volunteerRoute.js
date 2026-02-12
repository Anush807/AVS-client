const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  assignTask,
  submitReport,
  approveTask,
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

module.exports = router;