const express = require("express");
const router = express.Router();
const {
  login,
  registerDonor,
  registerBeneficiary,
  registerVolunteer,
} = require("../controllers/authController");

// Login (existing)
router.post("/login", login);

// Registration routes (public - no authentication required)
router.post("/register/donor", registerDonor);
router.post("/register/beneficiary", registerBeneficiary);
router.post("/register/volunteer", registerVolunteer);

module.exports = router;