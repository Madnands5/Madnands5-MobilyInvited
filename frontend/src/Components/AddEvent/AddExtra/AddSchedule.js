import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import noimage from "../../../Assets/image-not-found.svg";
export default function AddSchedule(props) {
  const [subEvent, setSubevent] = useState(
    [...CurrentEventDetails.schedule] || []
  );
  const [singlesubevent, setsinglesubevent] = useState({
    Name: "",
    datetime: "",
    description: "",
  });
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        {subEvent.map((eve, index) => (
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <img src={props.subEvent.file} />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <img
              src={props.subEvent.file === "" ? noimage : props.subEvent.file}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              className="w-100"
              label="Sub-Event Name"
              onChange={(e) => {
                setsinglesubevent({ ...singlesubevent, Name: e.target.value });
              }}
              value={singlesubevent.Name}
            />
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
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
          </Grid>
          <Grid item xs={12}>
            <CheckCircleOutlineIcon />
            <DeleteForeverIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
