const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  firstname: {
    type: String,
  },

  lastname: {
    type: String,
  },

  joined: {
    type: Date,
    default: Date.now,
  },

  bio: {
    type: String,
  },

  address: {
    type: String,
  },

  profilepic: {
    type: String,
  },
});
module.exports = User;
