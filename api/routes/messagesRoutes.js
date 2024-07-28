const express = require("express");
const { getMessages } = require("../controllers/messagesController");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/messages", authenticateJWT, getMessages);

module.exports = router;
