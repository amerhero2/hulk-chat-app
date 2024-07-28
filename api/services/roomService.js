const Room = require("../models/Room");

async function createRoom({ label }) {
  try {
    const existingRoom = await Room.findOne({ where: { label } });
    if (existingRoom) {
      throw new Error("Room already exists");
    }

    const room = await Room.create({
      label,
    });

    return room;
  } catch (error) {
    throw error;
  }
}

async function getRooms() {
  try {
    const rooms = await Room.findAll();

    return rooms;
  } catch (error) {
    throw error;
  }
}

module.exports = { createRoom, getRooms };
