const mongoose = require("mongoose");
const Notifyschema = new mongoose.Schema({
  Notification: {
    type: String,
  },
  to: {
    type: Array,
  },
});
module.exports = mongoose.model("Notify", Notifyschema);
