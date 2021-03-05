const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fileurl: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  CommentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  LikeList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});
module.exports = mongoose.model("Posts", PostsSchema);
