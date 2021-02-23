import React, { useState } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
export default function AddSchedule(props) {
  const [subEvent, setSubevent] = useState([
    ...props.CurrentEventDetails.Schedule,
  ]);
  const [singlesubevent, setsinglesubevent] = useState({
    Name: "",
    datetime: "",
    description: "",
  });
  const save = async () => {
    await setSubevent([...subEvent, singlesubevent]);
    await savefinal();
  };
  const Delete = () => {};
  const savefinal = () => {
    var EventsCopy = [...props.Events];
    EventsCopy[props.SelectedEvent].Schedule = subEvent;
    props.setEvents(EventsCopy);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h2>Add Schedule</h2>
      </Grid>
      <Grid item xs={12}>
        {subEvent.map((eve, index) => (
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <img
                src={
                  props.Events[props.SelectedEvent].file === undefined
                    ? " "
                    : props.Events[props.SelectedEvent]
                }
              />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} className="blue-border ">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={
                props.Events[props.SelectedEvent].file === undefined
                  ? " "
                  : props.Events[props.SelectedEvent].file
              }
              className="w-100"
            />
          </Grid>
          <Grid item xs={8} className="grey">
            <TextField
              className="w-100"
              label="Sub-Event Name"
              onChange={(e) => {
                setsinglesubevent({ ...singlesubevent, Name: e.target.value });
              }}
              value={singlesubevent.Name}
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
                  setsinglesubevent({
                    ...singlesubevent,
                    datetime: e.target.value,
                  });
                }}
                value={singlesubevent.datetime}
              />
            </form>
            <TextField
              className="w-100"
              label="Sub-Event Name"
              onChange={(e) => {
                setsinglesubevent({
                  ...singlesubevent,
                  description: e.target.value,
                });
              }}
              value={singlesubevent.description}
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
