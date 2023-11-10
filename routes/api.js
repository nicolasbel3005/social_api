const express = require('express');
const router = express.Router();
const { User, Thought, Reaction } = require('../models');

// Define your routes here

// Example: GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add routes for thoughts and reactions similarly
