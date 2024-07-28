const express = require("express");
const { validateCreateRoom } = require("../middlewares/validateMiddleware");
const { createRoom } = require("../controllers/roomController");

const router = express.Router();
router.post("/room", validateCreateRoom, createRoom);

module.exports = router;
