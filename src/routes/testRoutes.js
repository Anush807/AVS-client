const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/admin",
  authMiddleware(["admin"]),
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑",
      user: req.user,
    });
  }
);

router.get(
  "/user",
  authMiddleware(),
  (req, res) => {
    res.json({
      message: "Authenticated user",
      user: req.user,
    });
  }
);

module.exports = router;