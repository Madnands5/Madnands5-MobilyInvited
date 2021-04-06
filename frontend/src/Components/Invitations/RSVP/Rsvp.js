import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Rsvp.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Header from "../../Helpers/Header/Header";
import Toggler from "../../Helpers/EventInvitoggler/Toggler";
import BackNavBar from "../../Helpers/BackNavbar/BackNavBar";
import history from "../../../Utils/History";
import { rsvp_event } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import Back from "../../../Assets/Back.svg";
import { Avatar, Grid } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
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
      <>
        <Header url={props.location.pathname} />
        <Toggler toggle={console.log("toggle")} locaiton={"eve"} />
        <BackNavBar
          logo={<img src={Back} />}
          Name={"Rsvp"}
          functionality={() => {
            history.push("/MyInvitations");
          }}
          icon={
            <button
              className="Skip-button"
              onClick={() => {
                Next(evno + 1);
              }}
            >
              Skip
            </button>
          }
        />
        <Grid container spacing={0} className="p-15px pt-0">
          <Grid item xs={false} sm={2} md={2} />

          <Grid item xs={12} sm={8} md={8} className="">
            <Carousel
              indicators={false}
              interval={10000}
              navButtonsAlwaysInvisible={true}
              autoPlay={false}
            >
              {Eventdata.map((eve, index) => (
                <div className="w-100 mt-10px " key={"rsvp" + index}>
                  <Grid container spacing={0} className="RSVP-AVATAR">
                    <Grid item xs={3} sm={1}>
                      <Avatar
                        src={Eventdata[evno].file}
                        alt="Remy Sharp"
                        className="RSVP-avatar"
                      />
                    </Grid>
                    <Grid item xs={9} sm={11}>
                      <Grid item xs={12} className="fs-bold t-white">
                        {Eventdata[evno].InvId.Type +
                          ":" +
                          Eventdata[evno].Name}
                      </Grid>

                      <Grid item xs={12} className="fs-small t-white dt">
                        {Eventdata[evno].Date} {Eventdata[evno].Time}
                      </Grid>
                    </Grid>
                  </Grid>
                  <img src={Eventdata[evno].file} className="rsvp-img"></img>
                  <Grid container spacing={0} className="RSVP-AVATAR">
                    <Grid item xs={12} sm={12} className="rsvpoptions">
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                          <center>
                            <button
                              className={
                                hasrsvp === true && rsvpstatus === "Accept"
                                  ? "rsvp-options "
                                  : " rsvp-options dark-grey t-white "
                              }
                              onClick={async () => {
                                await dispatch(
                                  rsvp_event(
                                    Eventdata[evno]._id,
                                    "Accept",
                                    Auth.Phone
                                  )
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
                                  rsvp_event(
                                    Eventdata[evno]._id,
                                    "May Be",
                                    Auth.Phone
                                  )
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
                                  rsvp_event(
                                    Eventdata[evno]._id,
                                    "Decline",
                                    Auth.Phone
                                  )
                                );
                                Next(evno + 1);
                              }}
                            >
                              Decline
                            </button>
                          </center>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Carousel>
            <center>
              <div
                className=""
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
          </Grid>
          <Grid item xs={false} sm={2} md={2} />
        </Grid>
      </>
    </>
  );
  //   return (
  //     <>
  //       <Header />
  //       <div
  //         className="RSVP-card"
  //         style={{
  //           backgroundImage: "url(" + Eventdata[evno].file + ")",
  //           backgroundRepeat: "no-repaet",
  //         }}
  //       >
  //         <Grid container spacing={0} className="eventheader">
  //           <Grid item xs={6} className="back-button">
  //             <h2
  //               className="m-0"
  //               onClick={() => {
  //                 history.push("/home");
  //               }}
  //             >
  //               <ArrowBackIcon className="back-img" />
  //               {Eventdata[0].InvId.Type}
  //             </h2>
  //           </Grid>
  //           <Grid item xs={6} className="skip">
  //
  //           </Grid>
  //         </Grid>
  //         <div className="eventbuttons">

  //             </Grid>
  //           </Grid>
  //         </div>
  //         <center>
  //           <div
  //             className="indicator-container "
  //             style={{
  //               width: Eventdata.length * 10 + Eventdata.length * 10 + "px",
  //             }}
  //           >

  //           </div>
  //         </center>
  //       </div>
  //     </>
  //   );
}
