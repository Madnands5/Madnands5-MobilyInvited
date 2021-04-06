import React from "react";
import { Grid, Paper, InputBase, Divider, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import SendIcon from "@material-ui/icons/Send";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "96%",
    marginLeft: "1%",
    background: " #f5f0f0",
    borderRadius: "500px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
export default function Chatbox() {
  const classes = useStyles();
  return (
    <Grid container spacing={0} className="h100p">
      <Grid item xs={12} className="chat">
        <div className="recieved">hi</div>
        <div className="sender">hello</div>
      </Grid>
      <Grid item xs={12} className="inputbox">
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <AttachFileIcon className="tilt" />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "search google maps" }}
          />

          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
