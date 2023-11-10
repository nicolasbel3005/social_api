// thought.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => new Date(createdAt).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], // Reference to the Reaction schema
});

// Create a virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
