const mongoose = require("mongoose");
const UserDetailsSchema = new mongoose.Schema({
  Phone: {
    type: String,
    required: true,
  },
  Notifications: { type: String, required: true },
});
module.exports = mongoose.model("UserDetails", UserDetailsSchema);
