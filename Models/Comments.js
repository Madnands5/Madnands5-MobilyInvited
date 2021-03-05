const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  CommentBy: {
    type: String,
    required: true,
  },
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Comments", CommentSchema);
