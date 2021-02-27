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

  const save = async () => {
    let eventscpy = props.Events;
    let currentEvent = props.SelectedEvent;
    console.log(CurrentEventDetails);
    eventscpy[props.SelectedEvent] = CurrentEventDetails;

    await props.setEvents(eventscpy);
    props.SelectEvent(0);
    let result = await props.checkIfEventEmpty(eventscpy);
    console.log(result);
    if (result.status === true && result.index === null) {
      let EventsCopy = [...props.Events];

      props.setDisablesave(true);
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
          value={CurrentEventDetails.Time}
          onChange={(e) => {
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
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Link"
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
      ) : (
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
