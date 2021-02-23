import {
  LOGINSUCCESS,
  LOGINFAIL,
  GOTOTP,
  OPTEXPIRED,
  OTPVERIFIED,
} from "../Actions/AuthActions";
import setAuthToken from "../../Utils/Login";
import axios from "axios";
import { url } from "../../Utils/Config";
import jwt_decode from "jwt-decode";
import history from "../../Utils/History";
export function getopt(Phone) {
  return (dispatch) => {
    const userData = {
      Phone,
    };
    if (Phone !== "") {
      axios.post(url + "auth/send-otp", userData).then((res) => {
        console.log(res);
        if (res.data.status === "pending") {
          dispatch({
            type: GOTOTP,
          });
        } else {
        }
      });
    }
  };
}
export function verifyotp(Phone, code) {
  return async (dispatch) => {
    if (code !== "") {
      await axios
        .post(url + "auth/verify-otp", { Phone, code })
        .then(async (res) => {
          await console.log(res);
          if (
            res.data.status === "checked" &&
            res.data.response === "approved"
          ) {
            console.log(res.data.data);
            dispatch({
              type: OTPVERIFIED,
            });
          } else {
            dispatch({
              type: OPTEXPIRED,
            });
          }
        });
    }
  };
}
export function loginuser(Phone) {
  return (dispatch) => {
    const userData = {
      Phone,
    };
    if (Phone !== "") {
      axios
        .post(url + "auth/login", userData)
        .then((res) => {
          if (res.data.token) {
            const token = res.data.token;
            const decoded = jwt_decode(token);
            setAuthToken(token);
            dispatch({
              type: LOGINSUCCESS,
              payload: res.data,
            });
            history.push("/home");
          } else if (res.data.status === "-1") {
            dispatch({
              type: LOGINFAIL,
              payload: res.data.message,
            });
          } else if (res.data.details[0].message) {
            dispatch({
              type: LOGINFAIL,
              payload: res.data.details[0].message,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Auth falied");
    }
  };
}
