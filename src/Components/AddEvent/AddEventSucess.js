import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import history from "../../Utils/History";
import { Grid } from "@material-ui/core";
import check from "../../Assets/check-circle.1.png";
import Share from "../../Assets/Shareon.svg";
import FileCopyIcon from "@material-ui/icons/FileCopy";
export default function AddEventSucess(props) {
  const [url, seturl] = useState(props.match.params.id);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={false} sm={3} md={3} />
      <Grid item xs={12} sm={6} md={6}>
        <Grid container spacing={0} className="p-10px">
          <Grid item xs={12}>
            <center>
              <img src={check} className="p-10px " />
            </center>
          </Grid>
          <Grid item xs={12}>
            <h2 className="tac">
              Your Invitation has been sucessfully created.
            </h2>
          </Grid>
          <Grid item xs={12}>
            <p className="w-100 tac"> Click on the Link to copy</p>
          </Grid>
          <Grid
            item
            xs={12}
            className="tac m-b-25px clipboard"
            onClick={() => {
              navigator.clipboard.writeText(
                "https://mobily-invited-server.herokuapp.com/MyInvitations/" +
                  url
              );
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={11} className="link">
                {"https://mobily-invited-server.herokuapp.com/MyInvitations/" +
                  url}
              </Grid>{" "}
              <Grid item xs={1} className="p-t-10">
                <FileCopyIcon />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="w-100 tac">
            Share on
          </Grid>
          <Grid item xs={12} className="tac m-b-25px">
            <center>
              <img src={Share} className="" />
            </center>
          </Grid>
          <Grid item xs={12} className="tac">
            Note: Only those who have invite can access.
          </Grid>
          <Grid item xs={12} className="down-float">
            {" "}
            <button
              className="save-event"
              onClick={() => {
                history.push("/");
              }}
            >
              Done
            </button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
