const { Thought, User } = require('../models');

module.exports = {
  // get all thoughts
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
},
 // get a single thought
async getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
    if (!thought) {
      return res.status(404).json({ message: 'No thought with given ID' });
    }
    return res.json(thought);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}
