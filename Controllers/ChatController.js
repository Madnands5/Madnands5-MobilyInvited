const ChatGroup = require("../Models/ChatGroups");
exports.CreateGroup = async (req, res) => {
  try {
    let chatgroup = await new ChatGroup({
      Name: req.body.name,
      room: req.body.roomName,
      Participants: req.body.Participants,
      Admin: req.body.creator,
    });

    const grpdetails = await chatgroup.save();
    res.json({ status: "success", grpdetails });
  } catch (err) {
    res.json({ status: "failed", err });
  }
};
exports.GetGroup = async (req, res) => {
  try {
    const Events = await ChatGroup.find({
      $or: [{ Participants: Phone[1] }, { Participants: nocountryPhone }],
    });
    res.json({ status: "success", Events });
  } catch (err) {
    res.json({ status: "failed", err });
  }
};
