const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought
} = require('../../controllers/ThoughtController');

// GET /api/thoughts
router.route('/').get(getThoughts);

// POST /api/thoughts
router.route('/').post(createThought);

// GET /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

// POST /api/thoughts/:thoughtId
router.route('/:thoughtId').post(getSingleThought);

// GET /api/thoughts/:thoughtId/create
router.route('/:thoughtId/create').get(createThought);

// POST /api/thoughts/:thoughtId/create
router.route('/:thoughtId/create').post(createThought);

// GET /api/thoughts/:thoughtId/delete
router.route('/:thoughtId/delete').get(deleteThought);

// DELETE /api/thoughts/:thoughtId/delete
router.route('/:thoughtId/delete').delete(deleteThought);

// GET /api/thoughts/:thoughtId/update
router.route('/:thoughtId/update').get(updateThought);

// PUT /api/thoughts/:thoughtId/update
router.route('/:thoughtId/update').put(updateThought);

module.exports = router;