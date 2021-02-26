import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Gallery from "../../../Assets/ChooseFromGallery.svg";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
export default function AddSchedule(props) {
  const [subEvent, setSubevent] = useState([
    ...props.CurrentEventDetails.Schedule,
  ]);

  const [subname, setsubname] = useState("");
  const [file, setfile] = useState("");
  const [filetype, setfiletype] = useState("");
  const [datetime, setdatetime] = useState("");
  const [description, setdescription] = useState("");

  const save = async () => {
    let data = {
      Name: subname,
      datetime: datetime,
      description: description,
      file: file,
      filetype: filetype,
    };
    console.log([...subEvent, data]);

    await setSubevent([...props.CurrentEventDetails.Schedule, data]);

    var EventsCopy = { ...props.CurrentEventDetails };
    console.log(EventsCopy);
    EventsCopy.Schedule = [...props.CurrentEventDetails.Schedule, data];
    console.log(props.EventsCopy);
    await props.SetCurrentEventDetails(EventsCopy);
    console.log(props.Events);
    props.SetScheduleVisible(true);
    Delete();
  };
  const onDrop = useCallback(async (acceptedFiles) => {
    let dataurl = "";

    if (acceptedFiles[0].size > 5259265) {
    } else {
      let type = acceptedFiles[0].type.split("/");

      await getBase64(acceptedFiles[0]).then(async (data) => {
        setfile(data);
        setfiletype(type[1]);
      });
    }
  }, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg",
  });

  const Delete = () => {
    setsubname("");
    setfile("");
    setfiletype("");
    setdatetime("");
    setdescription("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2 className="m-0">Add Schedule</h2>
      </Grid>
      <Grid item xs={12}>
        {subEvent.map((eve, index) => (
          <Grid key={eve.Name + index} container spacing={0}>
            <Grid item xs={3}>
              {eve.filetype === "png" ||
              eve.filetype === "jpg" ||
              eve.filetype === "jpeg" ? (
                <img
                  src={eve.file === undefined ? " " : eve.file}
                  className="w-100"
                />
              ) : (
                <video
                  src={eve.file === undefined ? " " : eve.file}
                  className="w-100"
                />
              )}
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={0} className="m-5px">
                <Grid item xs={12}>
                  <b>{eve.Name}</b>
                </Grid>
                <Grid item xs={12}>
                  {eve.description}
                </Grid>
                <Grid item xs={12}>
                  {eve.datetime}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} className="blue-border ">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {file === "" ? (
              <div {...getRootProps()} className="w-100">
                <input {...getInputProps()} className="w-100" />
                <img
                  src={Gallery}
                  className="w-100 uploadhere"
                  className="w-100"
                />
              </div>
            ) : filetype === "png" ||
              filetype === "jpg" ||
              filetype === "jpeg" ? (
              <img src={file} className="w-100" />
            ) : (
              <div {...getRootProps()} className="w-100">
                <input {...getInputProps()} className="w-100" />
                <img
                  src={Gallery}
                  className="w-100 uploadhere"
                  className="w-100"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={8} className="grey">
            <TextField
              className="w-100"
              label="Sub-Event Name"
              onChange={(e) => {
                setsubname(e.target.value);
              }}
              value={subname}
            />
            <form noValidate>
              <TextField
                id="datetime-local"
                label="Schedule timing"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
                className="w-90-p "
                onChange={(e) => {
                  setdatetime(e.target.value);
                }}
                value={datetime}
              />
            </form>
            <TextField
              className="w-100"
              label="Sub-Event description"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              value={description}
            />
            <Grid item xs={12}>
              <IconButton
                onClick={() => {
                  save();
                }}
              >
                <CheckCircleOutlineIcon color="success" />
              </IconButton>
              <IconButton
                onClick={() => {
                  Delete();
                }}
              >
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
