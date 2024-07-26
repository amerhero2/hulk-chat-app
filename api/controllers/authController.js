const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }

    return res.status(200).json({ user: userData, token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { login };