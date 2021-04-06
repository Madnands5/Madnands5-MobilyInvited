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
  Host: [
    {
      type: String,
      required: true,
    },
  ],
  Story: [
    {
      type: Object,
    },
  ],
  Album: [
    {
      type: Object,
    },
  ],
});
module.exports = mongoose.model("Invitation", InvitationSchema);
