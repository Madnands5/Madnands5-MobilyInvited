import React, { useState, useEffect } from "react";
import Login from "../../Assets/Auth.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { Grid } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import OtpInput from "react-otp-input";

import {
  loginuser,
  getopt,
  verifyotp,
} from "../../Redux/DispatchFuncitons/AuthFunctions";

export default function LoginSignup() {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [number, setnumber] = useState(0);

  const [error, setError] = useState("");
  const [OTP, SetOPT] = useState();
  const [Phone, setPhone] = useState("");
  let phone = "";
  const handleClick = (e) => {
    phone = "+" + number.toString();
    dispatch(getopt(phone));
    setPhone(phone);
    setStep(1);
  };

  const handleCheck = () => {
    dispatch(verifyotp(Phone, OTP));
  };

  useEffect(() => {
    if (Auth.OTPStatus === true) {
      if (Auth.isVerified === true) {
        dispatch(loginuser(Phone));
      } else if (Auth.isVerified === false) {
        setStep(1);
      } else {
        setError("please check the input");
      }
    }
  }, [Auth.isVerified, Auth.OTPStatus]);

  if (step === 0) {
    return (
      <div>
        <div id="sign-in-button"></div>
        <img src={Login} alt="login" className="Auth-image" />
        <Grid container spacing={0}>
          <Grid item xs={12} className="modal-title">
            Login
            <p className="modal-title-description">
              Enter your Mobile Number and Verify your Login
            </p>
          </Grid>
          <Grid item xs={12} className="modal-title">
            <span>Phone Number</span>
            <PhoneInput
              country={"in"}
              value={number}
              onChange={(phone) => setnumber(phone)}
            />
            <p className="error">{Auth.Message}</p>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="get-otp-button"
            >
              Request Otp
            </button>
          </Grid>
        </Grid>
      </div>
    );
  } else if (step === 1) {
    return (
      <div>
        <div id="recaptcha-container" size="invisible"></div>
        <img src={Login} alt="login" className="Auth-image" />
        <Grid container spacing={0}>
          <Grid item xs={12} className="modal-title">
            Authorized OTP
            <p className="modal-title-description">
              Enter the code you recieved on your Mobile number
            </p>
          </Grid>
          <Grid item xs={12} className="modal-title">
            <span>Enter One Time Password (OTP)</span>{" "}
          </Grid>
          <Grid item xs={12} className="modal-title">
            <OtpInput
              className="OTP"
              value={OTP}
              onChange={(otp) => SetOPT(otp)}
              numInputs={6}
              separator={<span></span>}
              inputStyle="Otp-block"
              isInputNum={true}
            />
            <p className="error">{Auth.Message}</p>
            <button
              onClick={(e) => {
                handleCheck();
              }}
              className="get-otp-button"
            >
              Verify
            </button>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="resend-otp"
            >
              Resend OTP
            </button>
            <p onClick={() => setStep(0)} className="links">
              Change Number
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}
