import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Header from "../Helpers/Header/Header";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
export function Invitationbox(props) {
  <Grid
    container
    spacing="0"
    style={{ backgroundImage: props.invitation.url }}
    className="invitaion-card"
  >
    <NotificationsNoneOutlinedIcon className="bell-icon" />
    <div className="w-100 mt-70-p">
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              {props.invitation.Type}
            </Grid>
            <Grid item xs={12}>
              {props.invitation.date}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <button className="rsvp">RSVP</button>
        </Grid>
        <Grid item xs={2}>
          <LanguageOutlinedIcon />
        </Grid>
      </Grid>
    </div>
  </Grid>;
}

export default function invitation() {
  const [state, setstate] = useState("");
  useEffect(() => {}, []);
  const Auth = useSelector((state) => state.Auth);
  const InvitationList = useSelector((state) => state.InvitationList);
  return InvitationList.map((invitation, index) => {
    <Invitationbox invitation={invitation} index={index} className="w-100" />;
  });
}
