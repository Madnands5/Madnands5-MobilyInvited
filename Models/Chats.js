const mongoose = require("mongoose");
const ChatsSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Chats", ChatsSchema);
