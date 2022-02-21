const mongoose = require("mongoose");

const post = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  user: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comment: {
    photo: String,
    user: String,
    description: String,
  },
  likes: { type: Number },
  CreateAdd: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("post", post);
