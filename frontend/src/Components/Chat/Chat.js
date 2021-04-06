import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CList from "./List";
import Chatbox from "./chatbox";
import "./Chat.css";
export default function Chat() {
  const [show, setshow] = useState(1);
  const [windowwidth, setwindowwidth] = useState(1280);
  const [fullscreen, setfullscreen] = useState(true);
  function handleResize() {
    setwindowwidth(window.innerWidth);
    console.log(window.innerWidth);
    if (window.innerWidth > 959) {
      setfullscreen(true);
      console.log(true);
    } else {
      setfullscreen(false);
      console.log(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className="h7">
        <Grid
          item
          xs={12}
          className={fullscreen === true ? "show h93" : "hide "}
        >
          <h2 className="chatheadertitle">Chat</h2>
        </Grid>
        <Grid
          item
          xs={12}
          className={fullscreen === true ? "hide" : "show h93"}
        >
          <List className="p-0 m-0">
            <ListItem className=" m-0">
              <IconButton>
                <ArrowBackIosIcon />
              </IconButton>
              <ListItemIcon>
                <Avatar />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        className={
          fullscreen === false
            ? show === 0
              ? "show h93"
              : "hide "
            : "show h93"
        }
      >
        <CList />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        className={fullscreen === false && show === 0 ? "hide" : "show h93"}
      >
        <Chatbox />
      </Grid>
    </Grid>
  );
}
