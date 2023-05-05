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
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const dbThoughtData = await User.findById(req.body.userId)
            Thought.create({ _id: req.params.thoughtId });
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
     // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) => res.json({ thought }))
      .catch((err) => res.status(500).json(err));
  },
    async updateThought(req, res) {
        try{
        const ThoughtUpdate = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId });

        if(!ThoughtUpdate) {
            return res.status(404).json({ message: 'No thought with that ID' })
        }

        res.json(ThoughtUpdate);
    } catch (err) {
        res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      //delete reaction
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No thought found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    //create reaction
   createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

  // Add an thought to a user
      //   async addThought(req, res) {
      //     console.log('You are adding a thought');
      //     console.log(req.body);
      
      //     try {
      //       const user = await User.findOneAndUpdate(
      //         { _id: req.params.userId },
      //         { $addToSet: { thoughts: req.body } },
      //         { runValidators: true, new: true }
      //       );
      
      //       if (!user) {
      //         return res
      //           .status(404)
      //           .json({ message: 'No user found with that ID :(' });
      //       }
      
      //       res.json(user);
      //     } catch (err) {
      //       res.status(500).json(err);
      //     }
      //   },
      //   // Remove thought from a user
      //   async removeThought(req, res) {
      //     try {
      //       const user = await User.findOneAndUpdate(
      //         { _id: req.params.userId },
      //         { $pull: { thought: { thoughtId: req.params.thoughtId } } },
      //         { runValidators: true, new: true }
      //       );
      
      //       if (!user) {
      //         return res
      //           .status(404)
      //           .json({ message: 'No user found with that ID :(' });
      //       }
      
      //       res.json(user);
      //     } catch (err) {
      //       res.status(500).json(err);
      //     }
      //   },
      // };