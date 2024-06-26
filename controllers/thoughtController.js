const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      // Extract the username from the request body
      const { username } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      // If user doesn't exist, return an error
      if (!user) {
        return res.status(404).json({
          message: 'User not found with the provided username',
        });
      }

      // Create the thought
      const thought = await Thought.create({
        ...req.body,
        userId: user._id, // Assign the user ID to the thought
      });

      // Update the user's thoughts array
      user.thoughts.push(thought._id);
      await user.save();

      // Send success response
      res.json('Created the Thought 🎉');
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },


  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted! ',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      thought.reactions.push(req.body);
      const savedThought = await thought.save();
      res.json(savedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No Thought with that ID' });
      }

      thought.reactions = thought.reactions.filter(
        (reaction) => reaction.reactionId.toString() !== req.params.reactionId
      );

      const savedThought = await thought.save();
      res.json(savedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
