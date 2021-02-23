import React from "react";
import history from "./History";
import { useDispatch } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { loginuser } from "../Redux/DispatchFuncitons/AuthFunctions";
export default function Redirector() {
  // const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  let ischeck = reactLocalStorage.get("isLoggedIn");
  let Phone = reactLocalStorage.get("Phone");
  // let Token = reactLocalStorage.get("Token", true);
  if (ischeck === false || ischeck === undefined || ischeck === "") {
    history.push("/");
  } else {
    dispatch(loginuser(Phone));
  }
  return <div></div>;
}
