import React from "react";
import { Grid, Paper } from "@material-ui/core";
import NoInv from "../../Assets/NoInvitation.svg";
import "./Invitations.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
export default function Invitation(props) {
  if (props.data.length > 0) {
  } else {
    return <img src={NoInv} className="no-data" />;
  }
  return props.data.map((inv, index) => (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <div
          className="card"
          style={{
            backgroundImage: `url(${inv.file})`,
            backgroundRepeat: "none",
          }}
        >
          <Grid container spacing={0} className="float-bottom">
            <Grid xs={4} justify="center" className="t-white">
              <Grid container spacing={0}>
                <Grid xs={12} className="t-white">
                  {inv.InvId.Type}
                </Grid>
                <Grid xs={12} className="t-white fs-small">
                  {inv.Date} {inv.Time}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={4} justify="center">
              <button className="rsvp-button">RSVP</button>
            </Grid>
            <Grid xs={4} className="t-white">
              {inv.VenueType === "offline" ? (
                <LanguageIcon fontSize="large" />
              ) : (
                <LocationOnIcon fontSize="large" />
              )}
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  ));
}
