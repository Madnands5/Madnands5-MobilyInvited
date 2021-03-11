const ChatGroup = require("../Models/ChatGroups");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const User = require("../Models/User.js");
exports.CreateGroup = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });

    let chatgroup = await new ChatGroup({
      Name: req.body.name,
      room: req.body.roomName,
      Participants: [...req.body.Participants, user.Phone],
      GrpPhoto: req.body.file,
      Admin: user._id,
    });

    const grpdetails = await chatgroup.save();
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    let ref = User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: { Groups: grpdetails._id },
      },
      options
    );
    res.json({ status: "success", grpdetails });
  } catch (err) {
    res.json({ status: "failed", err });
  }
};

exports.GetGroups = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });

    const userdata = await User.findOne({ _id: req.user._id });
    console.log(userdata);
    let Phone = userdata.Phone.split("+");
    console.log(Phone[1]);
    let nocountryPhone = parseInt(Phone[1].substring(2));
    console.log(nocountryPhone);

    const Chatgroup = await ChatGroup.find({
      $or: [{ Participants: Phone[1] }, { Participants: nocountryPhone }],
    });
    res.json({ status: "success", Chatgroup });
  } catch (err) {
    console.log(err);
    res.json({ status: "failed", err });
  }
};
