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

exports.create = async (req, res) => {
  // console.log(req.body);
  res.Json(req.body);
  return false;
  let Meetingarray = [];
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const Events = req.body.Events;
  // console.log(Events);
  //create invitaion get id
  const invitaiton = await new Invitaion({
    Type: req.body.Type,
  });
  const Invitaitondata = await invitaiton.save();
  // console.log(Invitaitondata);
  //create events
  let createdEventList = [];
  Events.map(async (eventdata, index) => {
    //setting meeting
    if (
      eventdata.VenueType === "Online" ||
      eventdata.VenueType == "Online" ||
      eventdata.VenueType === "Both"
    ) {
      Meeting({
        clientId:
          "828075682004-m5srl06vinljtun3f3ibnposa0guq0r8.apps.googleusercontent.com",
        clientSecret: "BOha2cizKSAcq4V7RaZ2yuJM",
        refreshToken: "XXXXXXXXXCNfW2MMGvJUSk4V7LplXAXXXX",
        date: eventdata.Date,
        time: eventdata.Time,
        summary: eventdata.Name,
        location: "",
        description: eventdata.Description,
      }).then(function (result) {
        let newLocation = JSON.parse(eventdata.Location);
        newLocation.videoLink = result;
        newLocation = JSON.stringify(newLocation);
        console.log(newLocation);
        console.log(result); //result it the final link
      });
      Meetingarray.concat(eventdata.Participants);

      Meetingarray = [...new Set(Meetingarray)];
    }
    const singleevent = await new Event({
      Name: eventdata.Name,
      InvId: Invitaitondata._id,
      Date: eventdata.Date,
      Time: eventdata.Time,
      Description: eventdata.Description,
      GuestInvite: eventdata.GuestInvite,
      Location: newLocation,
      MainCode: eventdata.MainCode,
      Participants: eventdata.Participants,
      Schedule: eventdata.Schedule,
      VenueType: eventdata.VenueType,
      eventCode: eventdata.eventCode,
      file: eventdata.file,
      filetype: eventdata.filetype,
      Host: req.user.Phone,
    });

    const singleeventdata = await singleevent
      .save()
      .then(async () => {})
      .catch((err) => {
        console.log(err);
      });
    createdEventList.push(singleevent);
  });

  console.log(createdEventList);
  console.log(Meetingarray);
  await twilio.sendtowatsapp(
    Meetingarray,
    "You have been Mobily invited in celeration of " +
      req.body.Type +
      "Click here to join:https://www.google.com/" +
      eventdata.MainCode
  );
  //send links to participants
  // Events.map(async (singleevent, index) => {});

  res.json({ Participants: true });
};
exports.RSVP = async (req, res) => {
  const query = { _id: req.eid };
};
exports.Like = async (req, res) => {};
exports.Comment = async (req, res) => {};
exports.Update = async (req, res) => {};

exports.GetMyEvents = async (req, res) => {
  const invitaion = await Invitaion.find()
    .populate({ path: "EventList", match: { Host: req.me } })
    .exec();
  res.json(invitaion);
};
exports.GetInvitation = async (req, res) => {
  Person.find({ "yatin'snumber": { $in: ["Participants"] } });
  const invitaion = await Invitaion.find()
    .populate({
      path: "EventList",
      match: { "yatin'snumber": { $in: ["Participants"] } },
    })
    .exec();
  res.json(invitaion);
};

exports.DeleteEvents = async (req, res) => {
  Event.deleteOne({ _id: req.eid });
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
    res.JSON(userdetails);
  } catch (error) {
    console.log(error);
  }
};
