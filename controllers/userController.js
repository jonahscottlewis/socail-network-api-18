const { User, Thought} = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
      
            // const userObj = {
            //    users
            //   // headCount: await headCount(),
            // };
      
            res.json(users);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
        // Get a single user
        async getUserById(req, res) {
          try {
            const user = await User.findOne({ _id: req.params.userId })
              .select('-__v');
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' })
            }
      
            res.json({
              user
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
        // update user by id
        // Update a user
       updateUser(req, res) {
          User.findByIdAndUpdate(
            req.params.userId,
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: "No user with this id!" })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },
        // Delete a user and remove thoughts
        async deleteUser(req, res) {
          try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No such user exists' });
            }
      
              await Thought.deleteMany(
              {_id: {$in: user.thoughts}}
            );
      
            res.json({ message: 'User successfully deleted' });
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        },
      
        // /api/users/:userid/friends/:friendId
 // Add a friend
 addFriend(req, res) {
  User.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
// Delete a friend
deleteFriend(req, res) {
  User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user with this id!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
};