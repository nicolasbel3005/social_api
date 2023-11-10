// routes/api.js
const express = require('express');
const router = express.Router();
const { User, Thought, Reaction } = require('../models');

// ... (Other user routes)

// GET all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a single thought by its _id
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST to create a new thought
router.post('/thoughts', async (req, res) => {
  try {
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
});

// Add routes for updating and deleting thoughts

// POST to create a reaction for a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
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
});

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

