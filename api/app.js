const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const sequelize = require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const socketAuth = require("./middlewares/socketAuthMiddleware");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server running!");
});
app.use("/", userRoutes);
app.use("/", authRoutes);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use(socketAuth);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);

    socket.broadcast.to(room).emit("message", {
      message: `${socket.user.firstName} ${socket.user.lastName} has joined the room`,
    });
  });

  socket.on("message", (data) => {
    const { room, message } = data;

    console.log("USER :::::", socket.user);
    console.log(`Message to room ${room}: ${message}`);
    io.to(room).emit("message", { message, room, user: socket.user });
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
