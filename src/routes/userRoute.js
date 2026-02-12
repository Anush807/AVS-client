const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");

// Admin only
router.post(
  "/create",
  authMiddleware(["admin"]),
  createUser
);

router.delete(
  "/:id",
  authMiddleware(["admin"]),
  deleteUser
);

router.get(
  "/",
  authMiddleware(["admin"]),
  getUsers
);

module.exports = router;