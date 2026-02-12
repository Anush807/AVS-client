const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  makeDonation,
  getMyDonations,
  getAllDonations,
  getReceipt
} = require("../controllers/donationController");

// Donor makes donation
router.post(
  "/",
  authMiddleware(["donor"]),
  makeDonation
);

// Donor donation history
router.get(
  "/my",
  authMiddleware(["donor"]),
  getMyDonations
);

// Admin monitors all donations
router.get(
  "/all",
  authMiddleware(["admin"]),
  getAllDonations
);

router.get(
  "/receipt/:id",
  authMiddleware(["donor", "admin"]),
  getReceipt
);

module.exports = router;