import axios from "axios";
import { url } from "../../Utils/Config";
import {
  EVENTSAVED,
  EVENTSAVEFAIL,
  GOTMYEVENTS,
  GOTMYINVITAITONS,
} from "../Actions/EventActions";

import history from "../../Utils/History";
export function saveEvent(edata) {
  return (dispatch) => {
    console.log(edata);
    axios.post(url + "event/create", edata).then((res) => {
      console.log(res);
      history.push("/home");
    });
  };
}

export function GetEvents() {
  return (dispatch) => {
    axios.get(url + "event/getamyEvents").then((res) => {
      dispatch({
        type: GOTMYEVENTS,
        payload: res.data,
      });
    });
  };
}

export function GetInvitations() {
  return (dispatch) => {
    axios.get(url + "event/getmyInvitaion").then((res) => {
      dispatch({
        type: GOTMYINVITAITONS,
        payload: res.data,
      });
      console.log(res);
    });
  };
}
