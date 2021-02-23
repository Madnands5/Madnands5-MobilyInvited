// import React, { useEffect, useState } from "react";
import Logo from "../Assets/Logo.svg";
export default function Headings(props) {
  // const [url, seturl] = useState("");
  // useEffect(() => {
  //   let urlstr = props.url.split("/");
  //   seturl(urlstr[1]);
  // }, []);

  return (
    <span className="black-t title-name">
      <img src={Logo} className="Logo" alt="logo" />
    </span>
  );

  //return <span className="black-t">{props.url}123</span>;
}
