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
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
);

module.exports = thoughtSchema;