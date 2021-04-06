import React, { useState, useEffect } from "react";
import Header from "../../Helpers/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import "./Invitationlist.css";
import history from "../../../Utils/History";
import { Grid, TextField, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import UserData from "../../Helpers/UserData/UserData";
import SendIcon from "@material-ui/icons/Send";
import InsertCommentRoundedIcon from "@material-ui/icons/InsertCommentRounded";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
export default function Invitationlist(props) {
  const Eventdata = useSelector(
    (state) => state.Eventdata.myInvitations[props.match.params.id]
  );
  const [startlocation, setstartlocation] = useState({ x: 0, y: 0 });
  const [evno, setevno] = useState(0);
  const Auth = useSelector((state) => state.Auth);
  const [hasrsvp, setrsvp] = useState(false);
  const [rsvpstatus, setrsvpstatus] = useState("");
  const [Comment, setComment] = useState("");
  const dispatch = useDispatch();
  const Next = (i) => {
    console.log(i, Eventdata.length);
    if (i < Eventdata.length) {
      setevno(i);
    }
  };
  const Prev = (i) => {
    console.log(i, Eventdata.length);
    if (i >= 0) {
      setevno(i);
    }
  };
  function handleSwipe(e) {
    const firstTouchEvent = e.touches[0];

    const location = {
      x: firstTouchEvent.clientX,
      y: firstTouchEvent.clientY,
    };
    setstartlocation(location);
    //console.log(location);
  }
  function handleswipeend(e) {
    const firstTouchEvent = e.changedTouches[0];
    const location = {
      x: firstTouchEvent.clientX, //get the location of the end of the touch
      y: firstTouchEvent.clientY,
    };
    const differences = {
      x: startlocation.x - location.x, //find the difference from the start to the end touch
      y: startlocation.y - location.y,
    };
    if (differences.x < 0) {
      Prev(evno - 1);
    } else if (differences.x > 50) {
      Next(evno + 1);
    }
    // console.log(differences);
  }
  function handleSwipe(e) {
    const firstTouchEvent = e.touches[0];

    const location = {
      x: firstTouchEvent.clientX,
      y: firstTouchEvent.clientY,
    };
    setstartlocation(location);
    //console.log(location);
  }
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
      <IconButton className="next-button">
        <ArrowForwardIosRoundedIcon
          onClick={() => {
            Next(evno + 1);
          }}
        />
      </IconButton>
      <IconButton className="prev-button">
        <ArrowBackIosRoundedIcon
          onClick={() => {
            Next(evno - 1);
          }}
        />
      </IconButton>
      <div
        className="RSVP-card"
        style={{
          backgroundImage: "url(" + Eventdata[evno].file + ")",
          backgroundRepeat: "no-repaet",
        }}
        onTouchStart={(e) => {
          handleSwipe(e);
        }}
        onTouchEnd={(e) => {
          handleswipeend(e);
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
              GuestList
            </button>
          </Grid>
        </Grid>
        <div className="infocard">
          <div className="messageholder">
            <Grid container spacing={0}>
              <Grid item xs={2} sm={1}>
                <UserData
                  showIcon={true}
                  showName={false}
                  Phone={Eventdata[0].Host[0]}
                />
              </Grid>
              <Grid item xs={6} sm={9}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <UserData
                      showIcon={false}
                      showName={true}
                      Phone={Eventdata[0].Host[0]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="text"
                      className="w-100 b-none"
                      placeholder="Add a comment "
                      onChange={(e) => setComment(e.target.value)}
                      value={Comment}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4} sm={2}>
                <IconButton>
                  <SendIcon />
                </IconButton>
                <IconButton>
                  <InsertCommentRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
          <div className="buttons">
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <center>
                  <IconButton className="b-blue">
                    <ThumbUpAltIcon />
                  </IconButton>
                </center>
              </Grid>
              <Grid item xs={3}>
                <center>
                  <IconButton className="b-blue">
                    <RepeatRoundedIcon />
                  </IconButton>
                </center>
              </Grid>
              <Grid item xs={3}>
                <center>
                  <IconButton className="b-blue">
                    <DateRangeRoundedIcon />
                  </IconButton>
                </center>
              </Grid>
              <Grid item xs={3}>
                <center>
                  <IconButton className="b-blue">
                    <LocationOnRoundedIcon />
                  </IconButton>
                </center>
              </Grid>
            </Grid>
          </div>
          <h3 className="m-0">
            {Eventdata[0].Date + " @" + Eventdata[0].Time}
          </h3>
          <p className="m-0"> {Eventdata[0].Description}</p>
          <center>
            <div
              className="dots-container "
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
      </div>
    </>
  );
}
