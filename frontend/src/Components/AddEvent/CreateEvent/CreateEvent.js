import React, { useCallback, useState, useEffect } from "react";
import {
  Grid,
  InputLabel,
  Select,
  FormControl,
  Modal,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDropzone } from "react-dropzone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import EventNameBox from "./EventNameBox";
import AddImg from "../../../Assets/AddImage.svg";
import Uploading from "../../../Assets/Uploading.svg";
import EventDetails from "./EventDetails";
import ImageSelectionModal from "./ImageSelectionModal";

export default function CreateEvent(props) {
  const [disablesave, setDisablesave] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const [processing, setProcessing] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg, video/mp4 ",
  });
  const [showPopup, toggleShowPopup] = useState(false);
  const [url, seturl] = useState(AddImg);
  useEffect(() => {
    if (
      props.Events[props.SelectedEvent] !== undefined &&
      props.Events[props.SelectedEvent].file !== ""
    ) {
      if (props.Events[props.SelectedEvent].file === "uploading") {
        seturl(Uploading);
      } else {
        seturl(props.Events[props.SelectedEvent].file);
      }
    } else {
      seturl(AddImg);
    }
  }, [
    props.Events[props.SelectedEvent] !== undefined
      ? props.Events[props.SelectedEvent].file
      : "",
  ]);
  return (
    <>
      <FormControl variant="outlined" className="w-100-p">
        <InputLabel htmlFor="outlined-age-native-simple">Types</InputLabel>
        <Select
          native
          value={props.Type}
          onChange={props.handleChange}
          label="Types"
          inputProps={{
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value="Weddings">Weddings</option>
          <option value="Birthdays">Birthdays</option>
          <option value="Wedding Anniversaries">Wedding Anniversaries</option>
          <option value="Get Together">Get Together</option>
        </Select>
      </FormControl>
      <div className="w-100-p grey">
        <Grid container spacing={0}>
          {" "}
          <Grid item xs={false} sm={1} md={2} />
          <Grid item xs={6} sm={6} md={6} className="tal p-t-15px ">
            Number Of Events
          </Grid>
          <Grid item xs={6} sm={5} md={4}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <div className="Cirlce tar p-t-5 fl">
                  <AddCircleOutlineIcon
                    className="l-blue-t"
                    fontSize="large"
                    onClick={() => {
                      props.addAnEvent();
                    }}
                  />
                </div>
                <div className="white box m-5px fl">{props.Events.length}</div>
                <div className="Cirlce tal p-t-5 fl">
                  <RemoveCircleOutlineIcon
                    className="l-blue-t"
                    fontSize="large"
                    onClick={() => {
                      props.removeAnEvent();
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="event-Names">
        <EventNameBox
          data={props.Events}
          setEvents={props.setEvents}
          SelectEvent={props.SelectEvent}
          SelectedEvent={props.SelectedEvent}
          checkIfEventEmpty={props.checkIfEventEmpty}
        />
      </div>
      <Grid item xs={12} sm={12}>
        {props.Events[props.SelectedEvent] !== undefined &&
        props.Events[props.SelectedEvent].file === "" ? (
          <img
            src={AddImg}
            className="w-100 m-5px"
            onClick={() => {
              toggleShowPopup(true);
            }}
          />
        ) : props.Events[props.SelectedEvent] !== undefined &&
          props.Events[props.SelectedEvent].filetype !== undefined ? (
          props.Events[props.SelectedEvent].filetype === "png" ||
          props.Events[props.SelectedEvent].filetype === "jpg" ||
          props.Events[props.SelectedEvent].filetype === "jpeg" ? (
            <img
              src={
                props.Events[props.SelectedEvent] !== undefined
                  ? props.Events[props.SelectedEvent].file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              className={
                processing === true
                  ? "transparent uploaded-file"
                  : "notTransparent uploaded-file"
              }
            />
          ) : (
            <video
              muted
              type="video/mp4"
              autoPlay={true}
              src={
                props.Events[props.SelectedEvent] !== undefined
                  ? props.Events[props.SelectedEvent].file
                  : " "
              }
              onClick={() => {
                toggleShowPopup(true);
              }}
              preload="none"
              className={
                processing === true
                  ? " transparent w-100 m-b-5px "
                  : "notTransparent  w-100 m-b-5px "
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
                setDisablesave={setDisablesave}
              />
            </div>
          </Modal>
        </div>
      </Grid>
      <Grid item xs={12}>
        <EventDetails
          Events={props.Events}
          setEvents={props.setEvents}
          SelectedEvent={props.SelectedEvent}
          SelectEvent={props.SelectEvent}
          checkIfEventEmpty={props.checkIfEventEmpty}
          setDisablesave={setDisablesave}
          disablesave={disablesave}
          setAlbum={props.setAlbum}
          setStory={props.setStory}
          template={props.template}
        />
      </Grid>

      <Grid item xs={12}>
        <button
          className={
            disablesave === false ? "save-events disabled" : "save-events "
          }
          onClick={() => {
            if (disablesave === true) {
              props.handleNext();
            }
          }}
        >
          Next
        </button>
      </Grid>
    </>
  );
}
