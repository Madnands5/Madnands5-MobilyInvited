import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Rsvp.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Header from "../../Helpers/Header/Header";
import { Grid } from "@material-ui/core";
import history from "../../../Utils/History";
import { rsvp_event } from "../../../Redux/DispatchFuncitons/Eventfunctions";
export default function Rsvp(props) {
  const [evno, setevno] = useState(0);
  const [hasrsvp, setrsvp] = useState(false);
  const [rsvpstatus, setrsvpstatus] = useState("");
  const Eventdata = useSelector(
    (state) => state.Eventdata.myInvitations[props.match.params.id]
  );
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const Next = (i) => {
    console.log(i, Eventdata.length);
    if (i < Eventdata.length) {
      setevno(i);
    } else {
      history.push("/home");
    }
  };
  useEffect(() => {
    if (Eventdata[evno].RSVPList.length > 0) {
      Eventdata[evno].RSVPList.map((rsvpdata, index) => {
        if (rsvpdata.By === Auth.Phone) {
          setrsvp(true);
          setrsvpstatus(rsvpdata.Status);
        } else {
          setrsvp(false);
          setrsvpstatus("");
        }
      });
    } else {
      setrsvp(false);
      setrsvpstatus("");
    }
  }, [evno]);
  return (
    <>
      <Header />
      <div
        className="RSVP-card"
        style={{
          backgroundImage: "url(" + Eventdata[evno].file + ")",
          backgroundRepeat: "no-repaet",
        }}
      >
        <Grid container spacing={0} className="eventheader">
          <Grid item xs={6} className="back-button">
            <h2
              className="m-0"
              onClick={() => {
                history.push("/home");
              }}
            >
              <ArrowBackIcon className="back-img" />
              {Eventdata[0].InvId.Type}
            </h2>
          </Grid>
          <Grid item xs={6} className="skip">
            <button
              className="Skip-button"
              onClick={() => {
                Next(evno + 1);
              }}
            >
              Skip
            </button>
          </Grid>
        </Grid>
        <div className="eventbuttons">
          <Grid container spacing={0}>
            <Grid item xs={4} justify="center">
              <center>
                <button
                  className={
                    hasrsvp === true && rsvpstatus === "Accept"
                      ? "rsvp-options "
                      : " rsvp-options dark-grey t-white "
                  }
                  onClick={async () => {
                    await dispatch(
                      rsvp_event(Eventdata[evno]._id, "Accept", Auth.Phone)
                    );
                    Next(evno + 1);
                  }}
                >
                  Accept
                </button>
              </center>
            </Grid>
            <Grid item xs={4}>
              <center>
                <button
                  className={
                    hasrsvp === true && rsvpstatus === "May Be"
                      ? "rsvp-options "
                      : " rsvp-options dark-grey t-white"
                  }
                  onClick={async () => {
                    await dispatch(
                      rsvp_event(Eventdata[evno]._id, "May Be", Auth.Phone)
                    );
                    Next(evno + 1);
                  }}
                >
                  May Be
                </button>
              </center>
            </Grid>
            <Grid item xs={4}>
              <center>
                <button
                  className={
                    hasrsvp === true && rsvpstatus === "Decline"
                      ? "rsvp-options "
                      : " rsvp-options dark-grey t-white"
                  }
                  onClick={async () => {
                    await dispatch(
                      rsvp_event(Eventdata[evno]._id, "Decline", Auth.Phone)
                    );
                    Next(evno + 1);
                  }}
                >
                  Decline
                </button>
              </center>
            </Grid>
          </Grid>
        </div>
        <center>
          <div
            className="indicator-container "
            style={{
              width: Eventdata.length * 10 + Eventdata.length * 10 + "px",
            }}
          >
            {Eventdata.map((eve, index) => (
              <>
                <div className={index === evno ? "dot l-blue" : "dot"} />
              </>
            ))}
          </div>
        </center>
      </div>
    </>
  );
}
