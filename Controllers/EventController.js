const Invitaion = require("../Models/Invitation");
const Event = require("../Models/Events");
const RSVP = require("../Models/Rsvp");
const Likes = require("../Models/Likes");
const Comments = require("../Models/Comments");
const Notifications = require("../Models/Notifications");
const twilio = require("../Utility/Twilio");
const Meeting = require("google-meet-api").meet;
const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const chatGroup = require("../Models/ChatGroups");
const Post = require("../Models/Posts");

exports.create = async (req, res) => {
  // console.log(req.body);
  let createdEventList = [];
  let Meetingarray = [];
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const user = await User.findOne({ _id: req.user._id });
  const Events = req.body.Events;

  const invitaiton = await new Invitaion({
    Type: req.body.Type,
    Host: [user.Phone],
  });

  const Invitaitondata = await invitaiton.save();
  console.log("invitation_createed");
  console.log(Invitaitondata);
  //create events

  let Maincode = Events[0].MainCode;

  Events.map(async (eventdata, index) => {
    //setting meeting
    Endtime = eventdata.Time.split(":");
    console.log(Endtime);
    Endtime[0] = Endtime[0] + 1;
    if (Endtime[0] < 10) {
      Endtime = "0" + Endtime[0] + Endtime[1];
    } else {
      Endtime = Endtime[0] + Endtime[1];
    }
    console.log("mapping");
    if (eventdata.VenueType === "Online" || eventdata.VenueType === "Both") {
    }
    console.log(req.user);
    const singleevent = await new Event({
      Name: eventdata.Name,
      InvId: Invitaitondata._id,
      Date: eventdata.Date,
      Time: eventdata.Time,
      Description: eventdata.Description,
      GuestInvite: eventdata.GuestInvite,
      Location: eventdata.Location,
      MainCode: eventdata.MainCode,
      Participants: eventdata.Participants,
      Schedule: eventdata.Schedule,
      VenueType: eventdata.VenueType,
      eventCode: eventdata.eventCode,
      file: eventdata.file,
      filetype: eventdata.filetype,
      Host: [user.Phone],
    });

    let singleeventdata = await singleevent
      .save()
      .then(async () => {})
      .catch((err) => {
        console.log(err);
      });
    const group = new chatGroup({
      Name: eventdata.Name,
      room: eventdata.eventCode,
      Participants: Participants,
      Admin: user.Phone,
    });
    await group.save();
    console.log(singleeventdata);
    await createdEventList.push({
      Name: eventdata.Name,
      InvId: Invitaitondata._id,
      Date: eventdata.Date,
      Time: eventdata.Time,
      Description: eventdata.Description,
      GuestInvite: eventdata.GuestInvite,
      Location: eventdata.Location,
      MainCode: eventdata.MainCode,
      Participants: eventdata.Participants,
      Schedule: eventdata.Schedule,
      VenueType: eventdata.VenueType,
      eventCode: eventdata.eventCode,
      file: eventdata.file,
      filetype: eventdata.filetype,
      Host: [user.Phone],
    });
  });

  console.log(createdEventList);
  console.log("finale");
  console.log(Meetingarray);

  console.log("sending msgs");
  await twilio.sendtowatsapp(
    Meetingarray,
    "You have been Mobily invited in celeration of " +
      req.body.Type +
      "Click here to join:https://www.google.com/" +
      Maincode
  );
  //send links to participants
  // Events.map(async (singleevent, index) => {});

  res.json({ createdEventList });
};
exports.RSVP = async (req, res) => {
  try {
    const Events = await Event.findOne({ _id: req.body.id });
    let UpdateEvents = "";
    console.log(Events._id);
    let id = Events._id;
    let rsvpdata = "";
    let finaldata = "";
    if (Events !== null) {
      console.log("Event Exists");

      const isrsvp = await RSVP.findOne({
        By: req.body.by,
        Eid: Events._id,
      });
      if (isrsvp === null) {
        console.log("no RSVP yet");
        rsvpdata = await new RSVP({
          By: req.body.by,
          Eid: Events._id,
          Status: req.body.status,
        });
        finaldata = await rsvpdata.save();
        console.log(" liked in like table ");
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            $push: { RSVPList: finaldata._id },
          },
          { new: true, useFindAndModify: false }
        )
          .then(() => console.log("updated success"))
          .catch((err) => {
            console.log(err);
          });

        if (UpdateEvents !== null) {
          console.log(" Event Updated ");
        } else {
          console.log(" Event not Updated ");
        }
      } else {
        console.log(" RSVP already");
        let rsvpid = isrsvp._id;
        finaldata = await RSVP.findByIdAndUpdate(
          rsvpid,
          {
            Status: req.body.status,
          },
          { new: true, useFindAndModify: false }
        );
        console.log(finaldata);
        console.log(" liked updated");
        console.log(finaldata);
      }

      res.json({ status: 1, finaldata });
    } else {
      res.json({ err: "invalid e_id" });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
};
exports.Like = async (req, res) => {
  try {
    const Events = await Event.findOne({ _id: req.body.id });
    let UpdateEvents = "";
    console.log(Events._id);
    let id = Events._id;
    if (Events !== null) {
      console.log("Event Exists");

      const isliked = await Likes.findOne({
        LikeBy: req.body.by,
        Eid: Events._id,
      });
      if (isliked === null) {
        console.log("not liked yet");
        const Likesdata = await new Likes({
          LikeBy: req.body.by,
          Eid: Events._id,
        });
        const finaldata = await Likesdata.save();
        console.log(" liked in like table ");
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            $push: { LikeList: finaldata._id },
          },
          { new: true, useFindAndModify: false }
        )
          .then(() => console.log("updated success"))
          .catch((err) => {
            console.log(err);
          });
        if (UpdateEvents !== null) {
          console.log(" Event Updated ");
        } else {
          console.log(" Event not Updated ");
        }
      } else {
        console.log(" liked already");
        Arraydata = await Events.LikeList.filter((like) => {
          like.LikeBy != req.body.by;
        });
        finaldata = await Likes.deleteOne({
          LikeBy: req.body.by,
          Eid: Events._id,
        });
        console.log(finaldata);
        console.log(" liked deleted");
        console.log(finaldata);
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            LikeList: Arraydata,
          },
          { new: true, useFindAndModify: false }
        );
        if (UpdateEvents !== null) {
          console.log(" Event Updated ");
        } else {
          console.log(" Event not Updated ");
        }
      }

      res.json({ status: 1, UpdateEvents });
    } else {
      res.json({ err: "invalid e_id" });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
};

exports.Comment = async (req, res) => {
  try {
    const Events = await Event.findOne({ _id: req.body.id });
    console.log(Events);
    let id = Events._id;
    console.log(Events._id);
    if (Events !== null) {
      const Commentsdata = await new Comments({
        CommentBy: req.body.by,
        Eid: Events._id,
        Comment: req.body.comment,
      });
      const finaldata = await Commentsdata.save();
      UpdateEvents = await Event.findByIdAndUpdate(
        id,
        {
          $push: { CommentList: finaldata._id },
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => console.log("updated success"))
        .catch((err) => {
          console.log(err);
        });
      res.json({ status: 1, finaldata });
    } else {
      res.json({ err: "invalid e_id" });
    }
  } catch (err) {
    console.log(err);
    res.json({ err: err });
  }
};

exports.GetMyEvents = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  console.log(req.user._id);
  const userdata = await User.findOne({ _id: req.user._id });
  console.log(userdata);
  let Phone = userdata.Phone.split("+");
  console.log(Phone[1]);
  let nocountryPhone = parseInt(Phone[1].substring(2));
  console.log(nocountryPhone);
  const Events = await Event.find({
    $or: [{ Participants: Phone[1] }, { Participants: nocountryPhone }],
  }).populate("InvId LikeList CommentList RSVPList");

  res.json(Events);
};

exports.GetInvitation = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const userdata = await User.findOne({ _id: req.user._id });
  console.log(userdata);
  let Phone = userdata.Phone.split("+");
  console.log(Phone);
  let nocountryPhone = parseInt(Phone[1].substring(2));
  console.log(nocountryPhone);
  const Events = await Event.find({
    $or: [{ Participants: Phone[1] }, { Participants: nocountryPhone }],
  }).populate("InvId LikeList CommentList RSVPList");
  console.log(Events);
  res.json(Events);
};

exports.DeleteEvents = async (req, res) => {
  Event.deleteOne({ _id: req.eid });
  res.json({ status: "success" });
};

exports.UpdateEvent = async (req, res) => {
  try {
    const query = { _id: req.eid };
    switch (req.query) {
      case "Date": {
        const update = {
          $set: {
            Date: req.body.data,
          },
        };
      }
      case "Time": {
        const update = {
          $set: {
            Time: req.body.data,
          },
        };
      }
      case "Description": {
        const update = {
          $set: {
            Description: req.body.data,
          },
        };
      }
      case "Location": {
        const update = {
          $set: {
            Location: req.body.data,
          },
        };
      }
      case "Participants": {
        const update = {
          $set: {
            Participants: req.body.data,
          },
        };
      }
      case "Schedule": {
        const update = {
          $set: {
            Schedule: req.body.data,
          },
        };
      }
      case "VenueType": {
        const update = {
          $set: {
            VenueType: req.body.data,
          },
        };
      }
      case "file": {
        const update = {
          $set: {
            file: req.body.data,
          },
        };
      }
      case "filetype": {
        const update = {
          $set: {
            filetype: req.body.data,
          },
        };
      }
      case "GuestInvite": {
        const update = {
          $set: {
            GuestInvite: req.body.data,
          },
        };
      }
      case "Host": {
        const update = {
          $set: {
            Host: req.body.data,
          },
        };
      }
      case "filetype": {
        const update = {
          $set: {
            filetype: req.body.data,
          },
        };
      }

      default:
        const update = {};
        break;
    }

    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    userdetails = await UserDetails.findOneAndUpdate(query, update, options);
    if (userdetails !== null) {
      res.JSON(userdetails);
    } else {
      res.JSON({ status: "failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.CreateGroup = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    const group = new chatGroup({
      Name: req.body.Name,
      room: req.body.eventCode,
      Participants: req.body.Participants,
      Admin: user.Phone,
    });
    await group.save();
    const userupdate = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { Groups: group._id },
      },
      { new: true, useFindAndModify: false }
    );
    res.json({ status1: "success", group });
  } catch (err) {
    res.json({ status1: "failed" });
  }
};
exports.GetGroups = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findOne({ _id: req.user._id });
    let Groups = chatGroup.find({
      $or: [{ Participants: user.Phone }, { Admin: user.Phone }],
    });
    res.json({ status1: "success", Groups });
  } catch (err) {
    res.json({ status1: "failed" });
  }
};
