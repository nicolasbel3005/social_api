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

