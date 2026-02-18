const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getStats,
  getTopDonors,
  getCampaignStats,
} = require("../controllers/dashboardController");

// Admin-only dashboard stats
router.get(
  "/stats",
  authMiddleware(["admin"]),
  getStats
);

// Public leaderboard - Allow all authenticated users (donor, admin, etc.) to view
router.get(
  "/leaderboard",
  authMiddleware(["admin", "donor", "volunteer", "beneficiary"]),
  getTopDonors
);

// Admin-only campaign stats
router.get(
  "/campaign-stats",
  authMiddleware(["admin"]),
  getCampaignStats
);

module.exports = router;