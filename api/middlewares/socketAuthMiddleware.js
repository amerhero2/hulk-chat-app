const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = process.env;

function socketAuth(socket, next) {
  const token =
    socket.handshake.query.token || socket.handshake.headers["authorization"];

  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      return next(new Error("Authentication error"));
    }

    try {
      const userData = await User.findByPk(user.id, {
        attributes: { exclude: ["password"] },
      });

      socket.user = userData.dataValues;
    } catch (err) {
      return next(new Error("Error getting an user"));
    }

    next();
  });
}

module.exports = socketAuth;
