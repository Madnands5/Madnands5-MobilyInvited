const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  LikeBy: {
    type: String,
    required: true,
  },
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});
module.exports = mongoose.model("Likes", LikeSchema);
