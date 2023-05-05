const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   //* Set default value to the current timestamp
    //   default: Date.now,
    //   // Use a getter method to format the timestamp on query
    //   get: (timestamp) => dateFormat(timestamp),
    // },
  },
  
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    // createdAt: {
    //   type: Date,
    //   //* Set default value to the current timestamp
    //   default: Date.now,
    //   // Use a getter method to format the timestamp on query
    //   get: (timestamp) => dateFormat(timestamp),
    // },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;