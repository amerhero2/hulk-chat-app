const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const sequelize = require("./db");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socketService = require("./socketService/socketService");

require("dotenv").config();

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

socketService(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log(`Database synchronized and server is running on port ${PORT}.`);
  } catch (err) {
    console.error("Unable to synchronize the database:", err);
  }
});
