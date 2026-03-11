const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },

    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'Drink',
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
