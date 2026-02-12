const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getStats,
  getTopDonors,
  getCampaignStats,
} = require("../controllers/dashboardController");

// Admin-only dashboard
router.get(
  "/stats",
  authMiddleware(["admin"]),
  getStats
);

router.get(
  "/leaderboard",
  authMiddleware(["admin"]),
  getTopDonors
);

router.get(
  "/campaign-stats",
  authMiddleware(["admin"]),
  getCampaignStats
);

module.exports = router;