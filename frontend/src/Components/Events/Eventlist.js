import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Eventlist.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import InfoIcon from "@material-ui/icons/Info";
import history from "../../Utils/History";
export default function EventList(props) {
  const [data, setData] = useState(props.data);
  useEffect(async () => {
    console.log(props.data);
    await setData(props.data);
  }, [props.data]);

  if (props.data !== undefined && props.data.length > 0) {
  } else {
    return <img src={NoInv} className="nodata" />;
  }
  return (
    <Grid container spacing={0}>
      {data.map((inv, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          className="InvitationCard"
          key={"invContainer" + index}
        >
          <img src={inv[0].file} className="inv-img" />
          <NotificationsNoneIcon className="card-button Notifyme t-white" />
          <div className="bottom-bar">
            <Grid container spacing={0}>
              <Grid item xs={8}>
                <Grid container spacing={0} className="event-info">
                  <Grid item xs={12} className="fs-bold t-white">
                    {inv[0].InvId.Type}
                  </Grid>
                  <Grid item xs={12} className="fs-small t-white">
                    {inv[0].Date} {inv[0].Time}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                {/* <button
                  className="card-button rsvp-button "
                  //   onClick={() => {
                  //     history.push("/inv/" + "RSVP" + "/" + index);
                  //   }}
                >
                  RSVP
                </button> */}
              </Grid>
              <Grid item xs={2} className="tac">
                {inv[0].VenueType === "Online" ||
                inv[0].VenueType === "Both" ? (
                  <LanguageIcon className="t-white mt-5px  " />
                ) : (
                  <LocationOnIcon className="t-white mt-5px " />
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))}
      {/* <Grid item xs={12} sm={6} className="InvitationCard">
        <img src={inv[0].file} className="inv-img" />
        <NotificationsIcon className="card-button Notifyme" />
        <div className="bootom-bar">
          <div className="fl-left">
            <Grid container spacing={0} className="event-info">
              <Grid item xs={12} className="fs-bold l-blue-t">
                {inv[0].InvId.Type}
              </Grid>
              <Grid item xs={12} className="fs-small">
                {inv[0].Date} {inv[0].Time}
              </Grid>
            </Grid>
          </div>
          <div className="fl-right">
            <button
              className="card-button rsvp-button "
              onClick={() => {
                history.push("/inv/" + "RSVP" + "/" + index);
              }}
            >
              RSVP
            </button>
            <LanguageIcon />
            <LocationOnIcon />
          </div>
        </div>
      </Grid> */}
    </Grid>
  );
}
