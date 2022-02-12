const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const Post = new Schema(
  {
    title: {
      type: String,
    },

    subtitle: {
      type: String,
    },

    description: {
      type: String,
    },

    Comments: [
      {
        Text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        date: {
          type: Date,
          default: Date.now.toString(),
        },
      },
    ],

    thumbnail: {
      type: String,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
