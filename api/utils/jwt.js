require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '5h' }
  );
}

module.exports = { generateToken };