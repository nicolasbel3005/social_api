// routes/api.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, Thought, Reaction } = require('../models');

// ... (Other user routes)

// POST route for user registration
router.post(
  '/register',
  [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Create a new user
      const user = await User.create({ username, email });
      await user.setPassword(password);
      await user.save();

      res.json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// POST route for user login
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  try {
    const token = jwt.sign({ sub: req.user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ... (Your other routes)

module.exports = router;
