const express = require("express");
const {
  registerUser,
  getUserDetails,
  getUsers,
} = require("../controllers/userController");
const {
  validateUserRegistration,
} = require("../middlewares/validateMiddleware");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", validateUserRegistration, registerUser);
router.get("/user", authenticateJWT, getUserDetails);
router.get("/users", authenticateJWT, getUsers);

module.exports = router;
