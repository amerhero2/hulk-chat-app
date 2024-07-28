const { validationResult } = require("express-validator");
const roomService = require("../services/roomService");

async function createRoom(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { label } = req.body;

  try {
    const room = await roomService.createRoom({ label });
    return res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    next(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getRooms(req, res, next) {
  try {
    const rooms = await roomService.getRooms();
    return res.status(200).json({
      rooms,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    next(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createRoom, getRooms };
