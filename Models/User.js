const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Phone: {
    type: Number,
    required: true,
  },
  // Password: {
  //   type: String,
  //   required: true,
  //   min: 2,
  // },
  // Subscription: {
  //   type: Number,
  //   default: 0,
  // },
  // //   SubscriptionFrom: {
  // //     type: Date,
  // //     default: Date.now,
  // //   },
  // //   SubscriptionTo: {
  // //     type: Date,
  // //     default: Date.now,
  // //   },
  // Userdid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "UserDetails",
  // },
});
module.exports = mongoose.model("User", UserSchema);
