const { validationResult } = require('express-validator');
const userService = require('../services/userService');

async function registerUser(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, firstName, lastName, password } = req.body;

  try {
    const newUser = await userService.createUser({ email, firstName, lastName, password });
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    next(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { registerUser };