const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      
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
    createdAt: {
      type: Date,
      //* Set default value to the current timestamp
      default: Date.now,
    },
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
       thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
       },
       createdAt: {
        type: Date,
        default: Date.now,
       },
       username: {
        type: String,
        required: true,
        ref: 'User',
       },
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