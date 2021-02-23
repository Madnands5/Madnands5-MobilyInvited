const mongoose = require("mongoose");
const InvitationSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  EventList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});
module.exports = mongoose.model("Invitation", InvitationSchema);
