const { User, Thought } = require('../models');

module.exports = {
   // get all users
async getUsers(req, res, next) {
  const allUsers = await User.find();
  res.json(allUsers);
},
// Get a user
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with given ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
},
// Create a user
async createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}, 
 // Update a user
async updateUser(req, res) {
   try {
     const updatedUser = await User.findOneAndUpdate(
       { _id: req.params.userId },
       { $set: req.body },
       { runValidators: true, new: true }
     );

     if (!updatedUser) {
       return res.status(404).json({ message: 'No user with given ID' });
     }

     return res.json(updatedUser);
   } catch (err) {
     return res.status(500).json(err);
   }
},
// Delete a user
async deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'No user with given ID' });
        }

        await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
        
        return res.json({ message: 'User and thoughts deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
}, 
