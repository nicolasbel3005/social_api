const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought
} = require('../../controllers/ThoughtController');

// Get all Thoughts/ create thought
router.route('/').get(getThoughts).post(createThought);

// Get Single Thought
router.route('/:thoughtId').post(getSingleThought);

// Delete Thought
router.route('/:thoughtId').delete(deleteThought);

// Update Thought
router.route('/:thoughtId').put(updateThought);

module.exports = router;