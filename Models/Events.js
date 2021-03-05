const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  Date: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  MainCode: {
    type: String,
    required: true,
  },
  Participants: {
    type: Array,
  },
  Schedule: {
    type: Array,
  },
  VenueType: {
    type: String,
    required: true,
  },
  eventCode: {
    type: String,
    required: true,
  },

  file: {
    type: String,
    required: true,
  },
  filetype: {
    type: String,
    required: true,
  },
  GuestInvite: {
    type: Boolean,
    required: true,
  },
  Host: [
    {
      type: String,
      required: true,
    },
  ],
  InvId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invitation",
    required: true,
  },
  CommentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  LikeList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
  RSVPList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RSVP",
    },
  ],
  PostList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});
module.exports = mongoose.model("Event", EventSchema);
