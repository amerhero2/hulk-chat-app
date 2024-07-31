const { createClient } = require("ioredis");
const { createAdapter } = require("@socket.io/redis-adapter");
const socketIo = require("socket.io");
const Message = require("../models/Message");
const socketAuth = require("../middlewares/socketAuthMiddleware");
const rateLimit = require("../middlewares/rateLimitMiddleware");
require("dotenv").config();

const socketService = (server) => {
  const REDISHOST = process.env.REDISHOST || "localhost";
  const REDISPORT = process.env.REDISPORT || 6379;

  const redisUrl = `redis://default:${REDISHOST}@redis-${REDISPORT}.c304.europe-west1-2.gce.cloud.redislabs.com:${REDISPORT}`;

  const pubClient = createClient(redisUrl);
  const subClient = pubClient.duplicate();

  pubClient.on("connect", () => {
    console.log("Publisher connected to Redis");
  });

  subClient.on("connect", () => {
    console.log("Subscriber connected to Redis");
  });

  pubClient.on("error", (err) => {
    console.error("Redis publisher error:", err);
  });

  subClient.on("error", (err) => {
    console.error("Redis subscriber error:", err);
  });

  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Attach the adapter to Socket.IO
  io.adapter(createAdapter(pubClient, subClient));
  io.use(socketAuth);

  const rateLimitMiddleware = rateLimit(pubClient, 60 * 1000, 10);
  io.use(rateLimitMiddleware);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);

      socket.broadcast.to(room).emit("message", {
        message: `${socket.user.firstName} ${socket.user.lastName} has joined the room`,
      });
    });

    socket.on("createRoom", (newRoom) => {
      socket.broadcast.emit("roomCreated", {
        room: newRoom.room,
      });
    });

    socket.on("message", async (data) => {
      rateLimitMiddleware(socket, async (err) => {
        if (err) {
          console.error("Rate limit error:", err);
          return;
        }

        const { room, message } = data;

        try {
          await Message.create({
            message,
            userId: socket.user.id,
            roomId: room,
          });
          console.log("USER :::::", socket.user);
          console.log(`Message to room ${room}: ${message}`);
          io.to(room).emit("message", { message, room, user: socket.user });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

module.exports = socketService;
