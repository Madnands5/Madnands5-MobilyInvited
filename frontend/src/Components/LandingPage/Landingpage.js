import React, { useState } from "react";
import Logo from "../../Assets/Logo.svg";
import CardButtons from "../../Assets/cardButtons.svg";
import Background from "../../Assets/HomePageBg.svg";
import { Grid } from "@material-ui/core";
import MobileAuth from "../Auth/MobileAuth";
import Popup from "../Helpers/Popups/Popup";
import "./Landingpage.css";
import LoginSignup from "../Auth/LoginSignup";
export default function Landingpage() {
  const [showPopup, toggleShowPopup] = useState(false);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={12} md={8} className="landing-header">
        <img src={Logo} className="logo" alt="logo" />
      </Grid>
      <Grid item xs={false} sm={false} md={4}>
        <button
          className="login"
          onClick={() => {
            toggleShowPopup(true);
          }}
        >
          Login/Sign-up
        </button>
      </Grid>

      <Grid item xs={12} sm={12} md={6} className="padding-left-3">
        <span className="landignpage-large-text">Multiple Events</span>
        <p> Manage Multiple Events Simultaniously</p>
        <img src={CardButtons} className="card-buttons" alt="CardButtons" />
        <MobileAuth />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <img src={Background} className="Background" alt="Background" />
      </Grid>
      <Popup
        toggleShowPopup={toggleShowPopup}
        showPopup={showPopup}
        component={LoginSignup}
      />
    </Grid>
  );
}
