const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  
  // Update a user
async updateUser(req, res) {
  try {
    const userId = req.params.userId; // Extract userId from URL 

    // Check if userId is available
    if (!userId) {
      return res.status(400).json({ message: 'No user ID provided' });
    }

    // Update user logic
    console.log('Updating user with ID:', userId);
    console.log('Request body:', req.body);

    // Update user by userId
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    ).populate('friends'); // Ensure friends are populated

    // Check if user is found and updated
    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }

    // Send updated user in response, including virtual field
    res.json({
      ...user.toJSON(),
      friendCount: user.friendCount // Include friendCount in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},

  
  
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      // Assuming user.thoughts is an array of thought IDs associated with the user
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  



// Add a friend to a user's friend list
async addFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Response with updated user information
    res.json({
      ...user.toJSON(),
      friendCount: user.friends.length // friendCount calculated from populated friends
    });
  } catch (err) {
    res.status(500).json(err);
  }
},

// Remove a friend from a user's friend list
async removeFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Response with updated user information
    res.json({
      ...user.toJSON(),
      friendCount: user.friends.length // friendCount recalculated
    });
  } catch (err) {
    res.status(500).json(err);
  }
},

};
