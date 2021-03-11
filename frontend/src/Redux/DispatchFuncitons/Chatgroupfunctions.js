import axios from "axios";
import { url } from "../../Utils/Config";
import jwt_decode from "jwt-decode";
import history from "../../Utils/History";
import { SAVEGROUP } from "../Actions/ChatActions";
export function getgroup() {
  return (dispatch) => {
    axios
      .get(url + "chatgroup/getmyrooms", { id: id, status: status, by: by })
      .then((res) => {
        dispatch(GetInvitations());
        console.log(res);
      });
  };
}
export function creategroup() {
  return (dispatch) => {
    axios
      .post(url + "chatgroup/createroom", { id: id, status: status, by: by })
      .then((res) => {
        dispatch(GetInvitations());
        console.log(res);
      });
  };
}
