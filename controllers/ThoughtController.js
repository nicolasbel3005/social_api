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
},
 // create a new thought
async createThought(req, res) {
  try {
    const { userId } = req.body;

    const thought = await Thought.create(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}, 
// delete a thought & remove thought from the user
async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Thought does not exist' });
      }

      const user = await Thought.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'Thought has been deleted but user was not found' });
      }

      res.json({ message: 'Thought has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
}, 
// update a thought
async updateThought(req, res) {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with ID given' });
    }

    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
},
};
