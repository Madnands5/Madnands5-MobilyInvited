const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Phone: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatGroups",
    },
  ],
});
module.exports = mongoose.model("User", UserSchema);
