const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  submitRequest,
  getPendingRequests,
  reviewRequest,
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

module.exports = router;