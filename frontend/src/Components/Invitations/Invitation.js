import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Invitations.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import InfoIcon from "@material-ui/icons/Info";
import history from "../../Utils/History";
export default function Invitation(props) {
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
    <Grid container spacing={0} className="tac mb-100">
      {data.map((inv, index) => (
        <Grid item xs={12} sm={6} className="tac " key={index}>
          <div className="invitaion">
            <img className="card" src={inv[0].file} />
            <Grid container spacing={0} className="tac tool-bar">
              <Grid item xs={false} sm={1}></Grid>
              <Grid item xs={4} sm={3}>
                <Grid item xs={12} className="fs-bold l-blue-t">
                  {inv[0].InvId.Type}
                </Grid>
                <Grid item xs={12} className="fs-small">
                  {inv[0].Date} {inv[0].Time}
                </Grid>
              </Grid>
              <Grid item xs={3} sm={3}>
                <button
                  className="rsvp-button"
                  onClick={() => {
                    history.push("/inv/" + "RSVP" + "/" + index);
                  }}
                >
                  RSVP
                </button>
              </Grid>

              <Grid
                item
                xs={2}
                title="notify Me"
                className="tool-button l-blue-t"
                onClick={() => {
                  history.push("/inv/" + "info/" + index);
                }}
              >
                <InfoIcon />
              </Grid>
              <Grid
                item
                xs={2}
                title="notify Me"
                className="tool-button l-blue-t"
                onClick={() => {
                  //togglenotigy
                }}
              >
                <NotificationsIcon />
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
