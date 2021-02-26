const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  LikeBy: {
    type: String,
  },
  Eid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});
module.exports = mongoose.model("Likes", LikeSchema);
