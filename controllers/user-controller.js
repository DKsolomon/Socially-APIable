const { User, } = require('../models');

const userController = {


  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req,res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err)
    }
},

  async updateUser(req,res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, 
            { new: true, runValidators: true});
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate( req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          } 

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;