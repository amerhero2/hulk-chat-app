const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const sequelize = require("./db");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socketAuth = require("./middlewares/socketAuthMiddleware");
const Message = require("./models/Message");
const rateLimit = require("./middlewares/rateLimitMiddleware");
require("dotenv").config();

const { createClient } = require("ioredis");
const { createAdapter } = require("@socket.io/redis-adapter");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./config/passport");

app.get("/", (req, res) => {
  res.send("Server running!");
});
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", roomRoutes);
app.use("/", messagesRoutes);

const redisUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME}:6379`;
const pubClient = createClient(redisUrl);
const subClient = pubClient.duplicate();

pubClient.on("connect", () => {
  console.log("Publisher connected to Redis");
});

subClient.on("connect", () => {
  console.log("Subscriber connected to Redis");
});

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
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
        await Message.create({ message, userId: socket.user.id, roomId: room });
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

const PORT = process.env.PORT || 8080;
server.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Database synchronized and server is running on port ${PORT}.`);
  } catch (err) {
    console.error("Unable to synchronize the database:", err);
  }
});
