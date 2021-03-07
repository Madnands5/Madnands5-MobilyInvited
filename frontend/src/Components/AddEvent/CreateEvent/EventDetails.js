import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControl,
  Paper,
  Modal,
  Button,
} from "@material-ui/core";
import AddImg from "../../../Assets/AddImage.svg";
import Scehedule from "../../../Assets/schedule.svg";
import Storyimg from "../../../Assets/AddStory.svg";
import Albumsimg from "../../../Assets/AddAlbums.svg";
import Map from "../../Helpers/Maps/Maps";
import CancelIcon from "@material-ui/icons/Cancel";
import Album from "../Extras/Album";
import Story from "../Extras/Story";
import AddSchedule from "../Extras/Schedule";
import ImageSelectionModal from "./ImageSelectionModal";
export default function EventDetails(props) {
  const [processing, setProcessing] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const [CurrentEventDetails, SetCurrentEventDetails] = useState({
    ...props.Events[props.SelectedEvent],
  });
  const [shedulevisible, SetScheduleVisible] = useState(false);
  const [storyvisible, SetStoryVisible] = useState(false);
  const [albumvisible, SetAlbumVisible] = useState(false);
  const [Location, setLocation] = useState("");
  useEffect(() => {
    if (props.Events[props.SelectedEvent] !== undefined) {
      SetCurrentEventDetails(props.Events[props.SelectedEvent]);
    }
  }, []);
  useEffect(() => {
    props.setDisablesave(false);
    if (props.Events[props.SelectedEvent] !== undefined) {
      SetCurrentEventDetails(props.Events[props.SelectedEvent]);
    }
  }, [props.SelectedEvent]);
  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    "271872414479-lumfn9dkcqh1k1et8dfau81dkcng81s4.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCdk1XolxNow08BXLxbzCeDReSrNTTlXCo";
  var clientSecret = "GpxXOinOWEyYdsbnVjolU9is";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  // const CreateMeeting = () => {
  //   gapi.load("client:auth2", () => {
  //     console.log("loaded client");

  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       clientId: CLIENT_ID,
  //       discoveryDocs: DISCOVERY_DOCS,
  //       scope: SCOPES,
  //     });

  //     gapi.client.load("calendar", "v3", () => console.log("bam!"));

  //     gapi.auth2
  //       .getAuthInstance()
  //       .signIn()
  //       .then(() => {
  //         var event = {
  //           summary: "Mobily Event!",
  //           conferenceData: {
  //             createRequest: {
  //               requestId: props.Events[props.SelectedEvent].MainCode,
  //               conferenceSolutionKey: { type: "hangoutsMeet" },
  //             },
  //           },

  //           description: "Really great refreshments",
  //           start: {
  //             dateTime: "2020-06-28T09:00:00-07:00",
  //             timeZone: "America/Los_Angeles",
  //           },
  //           end: {
  //             dateTime: "2020-06-28T17:00:00-07:00",
  //             timeZone: "America/Los_Angeles",
  //           },
  //           recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
  //           attendees: [
  //             { email: "lpage@example.com" },
  //             { email: "sbrin@example.com" },
  //           ],
  //           reminders: {
  //             useDefault: false,
  //             overrides: [
  //               { method: "email", minutes: 24 * 60 },
  //               { method: "popup", minutes: 10 },
  //             ],
  //           },
  //         };

  //         var request = gapi.client.calendar.events.insert({
  //           calendarId: "primary",
  //           resource: event,
  //         });

  //         request.execute((event) => {
  //           console.log(event);
  //           window.open(event.htmlLink);

  //           SetCurrentEventDetails({
  //             ...CurrentEventDetails,
  //             Location: { ...Location, Link: event.htmlLink },
  //           });
  //         });

  //         /*
  //           Uncomment the following block to get events
  //       */
  //         /*
  //       // get events
  //       gapi.client.calendar.events.list({
  //         'calendarId': 'primary',
  //         'timeMin': (new Date()).toISOString(),
  //         'showDeleted': false,
  //         'singleEvents': true,
  //         'maxResults': 10,
  //         'orderBy': 'startTime'
  //       }).then(response => {
  //         const events = response.result.items
  //         console.log('EVENTS: ', events)
  //       })
  //       */
  //       });
  //   });
  // };

  const save = async () => {
    let eventscpy = props.Events;
    let currentEvent = props.SelectedEvent;
    console.log(CurrentEventDetails);
    eventscpy[props.SelectedEvent] = CurrentEventDetails;

    await props.setEvents(eventscpy);
    await props.SelectEvent(0);
    let result = await props.checkIfEventEmpty(eventscpy);

    if (result.status === true) {
      let EventsCopy = [...props.Events];

      await props.setDisablesave(true);
      props.handleNext();
    } else {
      props.SelectEvent(result.index);
    }
  };
  useEffect(() => {
    SetCurrentEventDetails({
      ...CurrentEventDetails,
      Location: Location,
    });
  }, [Location]);
  const changevenue = () => {
    if (
      CurrentEventDetails.VenueType === "Online" ||
      CurrentEventDetails.VenueType === "Both"
    ) {
      // CreateMeeting();
      SetCurrentEventDetails({
        ...CurrentEventDetails,
        Location: "",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        {CurrentEventDetails !== undefined &&
        CurrentEventDetails.file === "" ? (
          <center>
            <img
              src={AddImg}
              className="add-Img"
              onClick={() => {
                toggleShowPopup(true);
              }}
            />
          </center>
        ) : CurrentEventDetails !== undefined &&
          CurrentEventDetails.filetype !== undefined ? (
          CurrentEventDetails.filetype === "png" ||
          CurrentEventDetails.filetype === "jpg" ||
          CurrentEventDetails.filetype === "jpeg" ? (
            <img
              src={
                CurrentEventDetails !== undefined
                  ? CurrentEventDetails.file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              className={
                processing === true
                  ? "transparent uploaded-file w-100"
                  : "notTransparent uploaded-file w-100"
              }
            />
          ) : (
            <video
              muted
              type="video/mp4"
              autoPlay={true}
              src={
                CurrentEventDetails !== undefined
                  ? CurrentEventDetails.file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              preload="none"
              className={
                processing === true
                  ? " transparent w-100"
                  : "notTransparent w-100"
              }
            />
          )
        ) : (
          <></>
        )}
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={showPopup}
            onClose={() => {
              toggleShowPopup(false);
            }}
          >
            <div className="modal-card">
              <CancelIcon
                onClick={() => {
                  toggleShowPopup(false);
                }}
                color="secondary"
                className="popup-close"
              />

              <ImageSelectionModal
                className="modal-component"
                data={props.Events}
                setEvents={props.setEvents}
                SelectEvent={props.SelectEvent}
                SelectedEvent={props.SelectedEvent}
                processing={processing}
                setDisablesave={props.setDisablesave}
                CurrentEventDetails={CurrentEventDetails}
                SetCurrentEventDetails={SetCurrentEventDetails}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basics"
          label="Enter Event Name"
          variant="outlined"
          className="w-100-p"
          value={CurrentEventDetails.Name}
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Name: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="date"
          label="Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          className="w-100-p"
          value={CurrentEventDetails.Date}
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Date: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="time"
          label="Time"
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          className="w-100-p"
          inputProps={{
            step: 300, // 5 min
          }}
          ampm={false}
          value={CurrentEventDetails.Time}
          onChange={(e) => {
            console.log(e.target.value);
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Time: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" className="w-100-p">
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="w-100-p"
            value={CurrentEventDetails.VenueType}
          >
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Online",
                });
              }}
              value="Online"
            >
              Online
            </MenuItem>
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Offline",
                });
              }}
              value="Offline"
            >
              Offline
            </MenuItem>
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Both",
                });
              }}
              value="Both"
            >
              Both
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {CurrentEventDetails.VenueType === "Online" ? (
        <>
          {" "}
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Place Meeting Links here"
              variant="outlined"
              className="w-100-p"
              value={CurrentEventDetails.Location}
              onChange={(e) => {
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  Location: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                window.open("https://meet.google.com/", "_blank");
              }}
            >
              Use Google-Meet
            </Button>
          </Grid>{" "}
          <Grid item xs={6}>
            {" "}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                window.open("https://zoom.us/", "_blank");
              }}
            >
              Use Zoom Calls
            </Button>
          </Grid>
        </>
      ) : CurrentEventDetails.VenueType === "Offline" ? (
        <>
          <Grid item xs={12} sm={12} md={12}>
            <Map
              SetCurrentEventDetails={SetCurrentEventDetails}
              CurrentEventDetails={CurrentEventDetails}
              center={{ lat: 20.5937, lng: 78.9629 }}
              height="300px"
              zoom={12}
              setLocation={setLocation}
            />
          </Grid>
        </>
      ) : (
        <>
          {" "}
          <Grid item xs={8}>
            <TextField
              id="outlined-basic"
              label="Place Meeting Links here"
              variant="outlined"
              className="w-100-p"
              value={CurrentEventDetails.Location}
              onChange={(e) => {
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  Location: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={() => {
                window.open("https://meet.google.com/", "_blank");
              }}
            >
              Use Google-Meet
            </Button>
          </Grid>{" "}
          <Grid item xs={6}>
            {" "}
            <Button
              variant="outlined"
              onClick={() => {
                window.open("https://www.geeksforgeeks.org", "_blank");
              }}
            >
              Use zoom
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Map
              SetCurrentEventDetails={SetCurrentEventDetails}
              CurrentEventDetails={CurrentEventDetails}
              center={{ lat: 20.5937, lng: 78.9629 }}
              height="300px"
              zoom={12}
              setLocation={setLocation}
            />
          </Grid>{" "}
        </>
      )}

      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          className="w-100-p"
          value={CurrentEventDetails.Description}
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Description: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={8} className="talc fs-bold">
        Guest can Invite (max 3)
      </Grid>
      <Grid item xs={4}>
        <Switch
          checked={CurrentEventDetails.GuestInvite}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
          className="fr"
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              GuestInvite: !CurrentEventDetails.GuestInvite,
            });
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} className="schedule-card">
          <center>
            <img src={Scehedule} alt="schedule" className="schedule-icon" />
            <h3>Add new Schedule</h3>
            <button
              className="add-schedule"
              onClick={() => {
                SetScheduleVisible(true);
              }}
            >
              Add
            </button>
          </center>
        </Paper>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={shedulevisible}
            onClose={() => {
              SetScheduleVisible(false);
            }}
          >
            <div className="modal-card">
              <CancelIcon
                onClick={() => {
                  SetScheduleVisible(false);
                }}
                color="secondary"
                className="popup-close"
              />
              <AddSchedule
                className="modal-component"
                data={props.Events}
                setEvents={props.setEvents}
                SelectEvent={props.SelectEvent}
                SelectedEvent={props.SelectedEvent}
                CurrentEventDetails={CurrentEventDetails}
                Events={props.Events}
                SelectedEvent={props.SelectedEvent}
                SetCurrentEventDetails={SetCurrentEventDetails}
                SetScheduleVisible={SetScheduleVisible}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      {props.SelectedEvent === 0 ? (
        <>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="schedule-card">
              <center>
                <img src={Storyimg} alt="schedule" className="schedule-icon" />
                <h3>Add new Story</h3>
                <button
                  className="add-schedule"
                  onClick={() => {
                    SetStoryVisible(true);
                  }}
                >
                  Add
                </button>
              </center>
            </Paper>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={storyvisible}
                onClose={() => {
                  SetStoryVisible(false);
                }}
              >
                <div className="modal-card">
                  <CancelIcon
                    onClick={() => {
                      SetStoryVisible(false);
                    }}
                    color="secondary"
                    className="popup-close"
                  />

                  <Story
                    className="modal-component"
                    setStory={props.setStory}
                    Story={props.Story}
                    SetStoryVisible={SetStoryVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="schedule-card">
              <center>
                <img src={Albumsimg} alt="schedule" className="schedule-icon" />
                <h3>Add Albums</h3>
                <button
                  className="add-schedule"
                  onClick={() => {
                    SetAlbumVisible(true);
                  }}
                >
                  Add
                </button>
              </center>
            </Paper>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={albumvisible}
                onClose={() => {
                  SetAlbumVisible(false);
                }}
              >
                <div className="modal-card">
                  <CancelIcon
                    onClick={() => {
                      SetAlbumVisible(false);
                    }}
                    color="secondary"
                    className="popup-close"
                  />
                  <Album
                    className="modal-component"
                    setalbumdata={props.setalbumdata}
                    albumdata={props.albumdata}
                    SetAlbumVisible={SetAlbumVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
        </>
      ) : (
        <></>
      )}

      <Grid item xs={12}>
        <button
          className={
            props.disablesave === false ? "save-event" : "save-event disabled"
          }
          onClick={() => {
            if (props.disablesave === false) {
              save();
            }
          }}
        >
          Save
        </button>
      </Grid>
    </Grid>
  );
}
