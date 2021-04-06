const Notify = require("../Models/Notify");
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const Notifythem = require("../Utility/Notify");
exports.GetNotifications = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    const Notifydata = await Notify.find({
      to: user._id,
    });
    if (Notifydata !== null) {
      res.json({ status: "success", data: Notifydata });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.Notifify = async (req, res) => {
  let notify = Notifythem(req.body.recipients, req.body.message);
};
