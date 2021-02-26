import React, { useState } from "react";
import "./Home.css";
import Header from "../Helpers/Header/Header";
import FootMenu from "../Helpers/FootMenu/FootMenu";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitations/Invitation";
export default function Home(props) {
  const [Menu, setMenu] = useState(0);
  return (
    <>
      <Header url={props.location.pathname} />
      <Grid container spacing={0}>
        <Grid item xs={false} sm={false} md={2} />
        <Grid item xs={12} sm={8} md={8}>
          {Menu === 0 ? <Invitation /> : <>My Events</>}
        </Grid>
        <Grid item xs={false} sm={false} md={2} />
      </Grid>
      <FootMenu menu={Menu} setMenu={setMenu} />
    </>
  );
}
