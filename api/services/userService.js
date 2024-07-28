const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createUser({ email, firstName, lastName, password }) {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUsers };
