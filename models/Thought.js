const { Schema, model } = require('mongoose');

// Define the thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleDateString('en-US'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Define a virtual to get the reaction count
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
  return this.reactions.length;
});

// Create and export the Thought model
module.exports = model('Thought', thoughtSchema);
