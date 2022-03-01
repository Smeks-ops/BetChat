const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    interests: {
      type: Array,
    }
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
