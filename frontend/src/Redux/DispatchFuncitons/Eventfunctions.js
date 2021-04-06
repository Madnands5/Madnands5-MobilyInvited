import axios from "axios";
import { url } from "../../Utils/Config";
import {
  EVENTSAVED,
  EVENTSAVEFAIL,
  GOTMYEVENTS,
  GETMYINVITAITONS,
} from "../Actions/EventActions";

import history from "../../Utils/History";
export function saveEvent(edata) {
  return (dispatch) => {
    console.log(edata);
    axios.post(url + "event/create", edata).then((res) => {
      console.log(res);
      history.push("/MyEvents/event-create-success/" + res.data.Maincode);
    });
  };
}

export function GetEvents() {
  return (dispatch) => {
    axios.get(url + "event/getmyEvents").then((res) => {
      dispatch({
        type: GOTMYEVENTS,
        payload: res.data.MyEvents,
      });
    });
  };
}

export function GetInvitations() {
  return (dispatch) => {
    axios.get(url + "event/getmyInvitaion").then((res) => {
      dispatch({
        type: GETMYINVITAITONS,
        payload: res.data.Invitations,
      });
      console.log(res);
    });
  };
}
export function rsvp_event(id, status, by) {
  return (dispatch) => {
    axios
      .post(url + "event/rsvp", { id: id, status: status, by: by })
      .then((res) => {
        dispatch(GetInvitations());
        console.log(res);
      });
  };
}
export function like_event(id, status, by) {
  return (dispatch) => {
    axios
      .post(url + "event/like", { id: id, status: status, by: by })
      .then((res) => {
        dispatch(GetInvitations());
        console.log(res);
      });
  };
}
export function comment_event(id, status, by) {
  return (dispatch) => {
    axios
      .post(url + "event/comment", { id: id, status: status, by: by })
      .then((res) => {
        dispatch(GetInvitations());
        console.log(res);
      });
  };
}
