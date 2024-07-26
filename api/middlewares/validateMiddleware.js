const { check } = require('express-validator');

const validateUserRegistration = [
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('firstName').not().isEmpty().withMessage('First name is required'),
  check('lastName').not().isEmpty().withMessage('Last name is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

module.exports = { validateUserRegistration };