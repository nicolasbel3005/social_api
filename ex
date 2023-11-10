const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { User, Thought, Reaction } = require('../models');

// ... (Other user routes)

// POST to create a new thought with input validation
router.post(
  '/thoughts',
  [
    // Input validation
    check('thoughtText').isLength({ min: 1, max: 280 }).withMessage('Thought must be 1-280 characters'),
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('userId').isMongoId().withMessage('Invalid user ID'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { thoughtText, username, userId } = req.body;

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const thought = await Thought.create({ thoughtText, username });

      // Push the created thought's _id to the associated user's thoughts array field
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// POST to create a reaction for a thought with input validation
router.post(
  '/thoughts/:thoughtId/reactions',
  [
    // Input validation
    check('reactionBody').isLength({ max: 280 }).withMessage('Reaction must be at most 280 characters'),
    check('username').trim().notEmpty().withMessage('Username is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { reactionBody, username } = req.body;
      const thoughtId = req.params.thoughtId;

      const reaction = { reactionBody, username };
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: reaction } },
        { new: true, runValidators: true }
      );

      res.json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// DELETE to remove a reaction by its reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    );

    res.json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
