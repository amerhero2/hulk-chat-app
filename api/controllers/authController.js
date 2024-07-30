const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // I decided to go with http only cookies to prevent JS access
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None", // since this is demo app, I would use "Strict" in a real life app
    });

    return res.status(200).json({ user: userData, token: accessToken });
  } catch (error) {
    return next(error);
  }
}

async function refreshToken(req, res) {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ accessToken: newAccessToken });
  });
}

module.exports = { login, refreshToken };
