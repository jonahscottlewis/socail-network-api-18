const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
       },
       createdAt: {
        type: Date,
        default: Date.now,
       },
       username: {
        type: String,
        ref: 'User',
       },
       reactions: {

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
      required: pageYOffset,
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

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});



module.exports = Thought;