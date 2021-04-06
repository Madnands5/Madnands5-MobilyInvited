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
import { makeStyles } from "@material-ui/core/styles";
import "./CreateEvent.css";
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
import AddDetails from "../AddDetails/AddDetails";
import { editform } from "../../../Redux/DispatchFuncitons/EventCreationFormFunction";
import { SAVEFORM } from "../../../Redux/Actions/EventCreationFormActions";
import { useDispatch } from "react-redux";
export default function EventDetails(props) {
  const useStyles = makeStyles((theme) => ({
    notchedOutline: {
      borderWidth: "3px",
      borderColor: "#3897f1 !important",
      borderRadius: "150px",
      color: "#3897f1 !important",
    },
  }));

  const classes = useStyles();

  const [processing, setProcessing] = useState(false);
  const [showPopup, toggleShowPopup] = useState(false);
  const [CurrentEventDetails, SetCurrentEventDetails] = useState({
    ...props.Events[props.SelectedEvent],
  });
  const [IsSubmitted, setSubmit] = useState(false);
  const [shedulevisible, SetScheduleVisible] = useState(false);
  const [storyvisible, SetStoryVisible] = useState(false);
  const [albumvisible, SetAlbumVisible] = useState(false);
  const [Link, setLink] = useState("");
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

  const save = async () => {
    debugger;
    let eventscpy = props.Events;
    let currentEvent = props.SelectedEvent;
    console.log(CurrentEventDetails);
    eventscpy[props.SelectedEvent] = CurrentEventDetails;

    await props.setEvents(eventscpy);
    // await props.SelectEvent(0);

    let result = await props.checkIfEventEmpty(
      eventscpy,
      props.Type,
      props.seterroring,
      props.SelectedEvent
    );
    await setSubmit(true);
    if (result.status === true) {
      let EventsCopy = [...props.Events];
      await props.setDisablesave(true);

      props.handleNext();
    } else {
      console.log("result false");
      console.log(IsSubmitted);
      await props.SelectEvent(result.index);
      console.log(result.index);
    }
  };

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
  const dispatch = useDispatch();

  const updatereduxform = async (data) => {
    await dispatch({
      type: SAVEFORM,
      payload: data,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        {CurrentEventDetails !== undefined &&
        CurrentEventDetails.file === "" ? (
          <center>
            <img
              src={AddImg}
              className={
                IsSubmitted === true
                  ? "add-Img error-box m-b-25px"
                  : "add-Img m-b-25px"
              }
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
                  ? "transparent uploaded-file w-100 m-b-25px"
                  : "notTransparent uploaded-file w-100 m-b-25px"
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
                  ? " transparent w-100 m-b-25px"
                  : "notTransparent w-100 m-b-25px"
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
                show={toggleShowPopup}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      <Grid item xs={12}>
        <span className="label">Type</span>
        <TextField
          id="outlined-basics"
          variant="outlined"
          className="w-100-p m-b-25px"
          size="small"
          value={CurrentEventDetails.Name}
          onChange={async (e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Name: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Name === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <span className="label">Date</span>
        <TextField
          id="date"
          // label="Date"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          className="w-100-p m-b-25px"
          value={CurrentEventDetails.Date}
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Date: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Date === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <span className="label">Time</span>
        <TextField
          id="time"
          // label="Time"
          variant="outlined"
          type="time"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          className="w-100-p m-b-25px"
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
          error={
            IsSubmitted === true && CurrentEventDetails.Time === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={5} sm={4}>
        <FormControl
          variant="outlined"
          className="w-100-p m-b-25px"
          size="small"
          variant="outlined"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        >
          <span className="label">Type</span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="w-100-p selectboxblue"
            value={CurrentEventDetails.VenueType}
            error={
              IsSubmitted === true && CurrentEventDetails.VenueType === ""
                ? true
                : false
            }
            variant="outlined"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          >
            <MenuItem
              className="w-100-p"
              onClick={(e) => {
                changevenue();
                SetCurrentEventDetails({
                  ...CurrentEventDetails,
                  VenueType: "Online-Inapp",
                });
              }}
              value="Online-Inapp"
            >
              Online-Inapp
            </MenuItem>
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

      <>
        <Grid
          item
          xs={7}
          sm={8}
          className={
            CurrentEventDetails.VenueType === "Online" ||
            CurrentEventDetails.VenueType === "Both"
              ? "show pt-18px"
              : "hide pt-18px"
          }
        >
          <span className="label">Place Meeting Links here</span>
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            className="w-100-p m-b-25px mt-10px"
            value={CurrentEventDetails.Link}
            onChange={(e) => {
              SetCurrentEventDetails({
                ...CurrentEventDetails,
                Link: e.target.value,
                Location: "",
              });
            }}
            error={
              IsSubmitted === true && CurrentEventDetails.Link === ""
                ? true
                : false
            }
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={CurrentEventDetails.VenueType === "Offline" ? 7 : 12}
          sm={CurrentEventDetails.VenueType === "Offline" ? 7 : 12}
          className={
            CurrentEventDetails.VenueType === "Online" ||
            CurrentEventDetails.VenueType === "Online-Inapp"
              ? "hide"
              : "show"
          }
        >
          <Map
            SetCurrentEventDetails={SetCurrentEventDetails}
            CurrentEventDetails={CurrentEventDetails}
            center={{ lat: 20.5937, lng: 78.9629 }}
            height="300px"
            zoom={12}
            setLocation={setLocation}
            Location={Location}
            type={"Offline"}
          />
          <span
            className={
              IsSubmitted === true && CurrentEventDetails.Location === ""
                ? "error"
                : "hide"
            }
          >
            Please add Location
          </span>
        </Grid>
      </>

      <Grid item xs={12}>
        <span className="label">Description</span>
        {/* <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            inputMode: "numeric"
          }}
        /> */}
        <TextField
          id="outlined-basic"
          // label="Description"
          size="small"
          variant="outlined"
          className="w-100-p m-7px m-b-25px "
          value={CurrentEventDetails.Description}
          onChange={(e) => {
            SetCurrentEventDetails({
              ...CurrentEventDetails,
              Description: e.target.value,
            });
          }}
          error={
            IsSubmitted === true && CurrentEventDetails.Description === ""
              ? true
              : false
          }
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={8} className="talc fs-bold m-b-25px fsm">
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
      <Grid
        item
        xs={props.SelectedEvent === 0 ? 4 : 12}
        md={props.SelectedEvent === 0 ? 4 : 12}
      >
        <Paper elevation={3} className="schedule-card">
          <center>
            <img src={Scehedule} alt="schedule" className="schedule-icon" />
            <h4 className="mfs"> Schedule</h4>
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
            className="f-s-modal"
            open={shedulevisible}
            onClose={() => {
              SetScheduleVisible(false);
            }}
          >
            <div className="f-s-modal-card">
              <AddDetails
                Name="Schedule"
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
                open={SetScheduleVisible}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      {props.SelectedEvent === 0 ? (
        <>
          <Grid item xs={4} md={4}>
            <Paper elevation={3} className="schedule-card">
              <center>
                <img src={Storyimg} alt="schedule" className="schedule-icon" />
                <h4 className="mfs"> Story</h4>
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
                className="f-s-modal"
                open={storyvisible}
                onClose={() => {
                  SetStoryVisible(false);
                }}
              >
                <div className="f-s-modal-card">
                  <AddDetails
                    Name="Story"
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
                    open={SetStoryVisible}
                  />
                </div>
              </Modal>
            </div>
          </Grid>
          <Grid item xs={4} md={4}>
            <Paper elevation={3} className="schedule-card">
              <center>
                <img src={Albumsimg} alt="schedule" className="schedule-icon" />
                <h4 className="mfs"> Albums</h4>
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
                className="f-s-modal"
                open={albumvisible}
                onClose={() => {
                  SetAlbumVisible(false);
                }}
              >
                <div className="f-s-modal-card">
                  <AddDetails
                    Name="Album"
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
                    open={SetAlbumVisible}
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
