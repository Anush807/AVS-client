const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

// Admin create
router.post(
  "/create",
  authMiddleware(["admin"]),
  createCampaign
);

// Public get
router.get("/", getCampaigns);

// Admin update
router.put(
  "/:id",
  authMiddleware(["admin"]),
  updateCampaign
);

// Admin delete
router.delete(
  "/:id",
  authMiddleware(["admin"]),
  deleteCampaign
);

module.exports = router;