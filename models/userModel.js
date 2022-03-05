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
  fullname: {
    type: String,
    default: "Please set your fullname first",
  },

  joined: {
    type: Date,
    default: Date.now,
  },

  bio: {
    type: String,
    default: "You dont have bio yet",
  },

  address: {
    type: String,
    default: "You dont have bio yet",
  },

  profilepic: {
    type: String,
    default:""
  },
});
module.exports = User;
