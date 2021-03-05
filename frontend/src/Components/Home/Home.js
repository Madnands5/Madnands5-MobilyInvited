import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Helpers/Header/Header";
import FootMenu from "../Helpers/FootMenu/FootMenu";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitations/Invitation";
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
  }, []);
  return (
    <>
      <Header url={props.location.pathname} />
      <Grid container spacing={0}>
        <Grid item xs={false} sm={false} md={2} />
        <Grid item xs={12} sm={8} md={8}>
          {Menu === 0 ? (
            <Invitation data={EventState.myEvents} className="w-100" />
          ) : (
            <>My Events</>
          )}
        </Grid>
        <Grid item xs={false} sm={false} md={2} />
      </Grid>
      <FootMenu menu={Menu} setMenu={setMenu} />
    </>
  );
}
