const express = require("express");
const { validateCreateRoom } = require("../middlewares/validateMiddleware");
const { createRoom, getRooms } = require("../controllers/roomController");
const { authenticateJWT } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/room", authenticateJWT, validateCreateRoom, createRoom);
router.get("/rooms", authenticateJWT, getRooms);

module.exports = router;
