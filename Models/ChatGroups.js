const mongoose = require("mongoose");
const ChatGroupSchema = new mongoose.Schema({
  Name: {
    type: String,
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
  GrpPhoto: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    default: "INDV",
  },
  Uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("ChatGroups", ChatGroupSchema);
