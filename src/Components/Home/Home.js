import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Helpers/Header/Header";
import FootMenu from "../Helpers/FootMenu/FootMenu";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitations/Invitation";
import EventList from "../Events/Eventlist";
import { useSelector, useDispatch } from "react-redux";
import {
  GetEvents,
  GetInvitations,
} from "../../Redux/DispatchFuncitons/Eventfunctions";
export default function Home(props) {
  const dispatch = useDispatch();
  const [Menu, setMenu] = useState(0);
  const EventState = useSelector((state) => state.Eventdata);
  useEffect(async () => {
    dispatch(GetEvents());
    dispatch(GetInvitations());
    // await console.log(EventState);

    if (
      props.location.pathname === "/MyInvitations" ||
      props.location.pathname === "/" ||
      props.location.pathname === "/home"
    ) {
      await setMenu(0);
    } else {
      setMenu(1);
    }
  }, []);
  return (
    <>
      <Header url={props.location.pathname} />
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12}>
          {Menu === 0 ? (
            <Invitation data={EventState.myInvitations} className="w-100" />
          ) : (
            <EventList data={EventState.myEvents} className="w-100" />
          )}
        </Grid>
      </Grid>
      <FootMenu menu={Menu} setMenu={setMenu} />
    </>
  );
}
