import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@material-ui/core";
export default function ChatList() {
  const Groups = useSelector((state) => state.Auth.Groups);
  const [option, setoption] = useState(0);
  let GroupList = [];
  let Personal = [];
  useEffect(() => {
    if (Groups !== undefined && Groups.length > 0) {
      GroupList = Groups.filter(function (grps) {
        return grps.Type === "GRP";
      });
      Personal = Groups.filter(function (grps) {
        return grps.Type === "INDV";
      });
    }
  }, []);
  return (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <h2>Chats</h2>
      </Grid>
      <Grid xs={12}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            className={option === 0 ? "l-blue-t " : "grey-t"}
            onClick={() => {
              setoption(0);
            }}
          >
            Direct
          </Grid>
          <Grid
            xs={6}
            className={option === 0 ? "l-blue-t " : "grey-t"}
            onClick={() => {
              setoption(0);
            }}
          >
            Group
          </Grid>
        </Grid>
      </Grid>
      {option === 0 ? (
        <List>
          {GroupList.map((grp) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={grp.GrpPhoto} />
              </ListItemAvatar>
              <ListItemText primary={grp.Name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {Personal.map((grp) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={grp.GrpPhoto} />
              </ListItemAvatar>
              <ListItemText primary={grp.Name} />
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  );
}
