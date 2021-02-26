const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  CommentBy: {
    type: String,
  },
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});
module.exports = mongoose.model("Comments", CommentSchema);
