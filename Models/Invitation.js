const mongoose = require("mongoose");
const InvitationSchema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  EventList: [{ Event: { type: mongoose.Schema.ObjectId, ref: "Event" } }],
  Host: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Invitation", InvitationSchema);
