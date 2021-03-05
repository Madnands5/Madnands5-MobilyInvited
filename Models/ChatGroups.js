const mongoose = require("mongoose");
const ChatGroupSchema = new mongoose.Schema({
  Name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  Participants: {
    type: Array,
    required: true,
  },
  Admin: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("ChatGroups", ChatGroupSchema);
