const mongoose = require("mongoose");
const UserDetailsSchema = new mongoose.Schema({
  Userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Notifications: { type: String, required: true },
});
module.exports = mongoose.model("UserDetails", UserDetailsSchema);
