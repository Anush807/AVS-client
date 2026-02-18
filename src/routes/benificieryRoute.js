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

// NEW: Admin gets all requests (pending + approved + rejected)
router.get(
  "/all",
  authMiddleware(["admin"]),
  getAllRequests
);

module.exports = router;