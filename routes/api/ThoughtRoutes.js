const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought
} = require('../../controllers/ThoughtController');

// Get all Thoughts
router.route('/').get(getThoughts).get(getThoughts);

// Get Single Thought
router.route('/:thoughtId').get(getSingleThought).post(getSingleThought);

// Create Thought
router.route('/:thoughtId').get(createThought).post(createThought);

// Delete Thought
router.route('/:thoughtId').get(deleteThought).delete(deleteThought);

// Update Thought
router.route('/:thoughtId').get(updateThought).put(updateThought);

module.exports = router;