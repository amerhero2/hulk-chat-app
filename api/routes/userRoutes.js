const express = require('express');
const { registerUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../middlewares/validateMiddleware');

const router = express.Router();
router.post('/register', validateUserRegistration, registerUser);

module.exports = router;