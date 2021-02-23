const Invitaion = require("../Models/Invitation");
const Event = require("../Models/Events");
const filehandling = require("../Utility/FileUpload");
const bucket = require("../Utility/FireBase");
const { v4: uuidv4 } = require("uuid");
const twilio = require("../Utility/Twilio");
const Meeting = require("google-meet-api").meet;
exports.create = async (req, res) => {
  // console.log(req.body);
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
    });
    console.log(eventdata.file);
    //setting meeting
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
      console.log(result); //result it the final link
    });

    const singleeventdata = await singleevent
      .save()
      .then(async () => {
        await twilio.sendtowatsapp(
          eventdata.Participants,
          "You have been Mobily invited in celeration of " +
            req.body.Type +
            "Click here to join:https://www.google.com/" +
            eventdata.MainCode +
            eventdata.eventCode
        );
      })
      .catch((err) => {
        console.log(err);
      });
    createdEventList.push(singleevent);
  });

  console.log(createdEventList);
  //send links to participants
  // Events.map(async (singleevent, index) => {});

  res.json({ Participants: true });
};
