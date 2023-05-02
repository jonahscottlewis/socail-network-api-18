const { User, Thought} = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
      
            const userObj = {
              users,
              headCount: await headCount(),
            };
      
            res.json(userObj);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
        // Get a single user
        async getSingleUser(req, res) {
          try {
            const user = await User.findOne({ _id: req.params.userId })
              .select('-__v');
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' })
            }
      
            res.json({
              user,
              grade: await grade(req.params.userId),
            });
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
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
        // Delete a user and remove them from the course
        async deleteUser(req, res) {
          try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No such user exists' });
            }
      
            const course = await Course.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            );
      
            if (!course) {
              return res.status(404).json({
                message: 'User deleted, but no courses found',
              });
            }
      
            res.json({ message: 'User successfully deleted' });
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        },
      
        // Add an thought to a user
        async addThought(req, res) {
          console.log('You are adding a thought');
          console.log(req.body);
      
          try {
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { thoughts: req.body } },
              { runValidators: true, new: true }
            );
      
            if (!user) {
              return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
            }
      
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
        },
        // Remove thought from a user
        async removeThought(req, res) {
          try {
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { thought: { thoughtId: req.params.thoughtId } } },
              { runValidators: true, new: true }
            );
      
            if (!user) {
              return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
            }
      
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
        },
      };