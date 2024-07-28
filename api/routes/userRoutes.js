const express = require("express");
const {
  registerUser,
  getUserDetails,
} = require("../controllers/userController");
const {
  validateUserRegistration,
} = require("../middlewares/validateMiddleware");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", validateUserRegistration, registerUser);
router.get("/user", authenticateJWT, getUserDetails);

module.exports = router;
