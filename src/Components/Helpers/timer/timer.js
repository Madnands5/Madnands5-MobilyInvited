import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
export default function Timer(props) {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      props.setStep(0);
      return <></>;
    } else {
      // Render a countdown
      return (
        <>
          OTP will expire in : {hours}:{minutes}:{seconds}
        </>
      );
    }
  };
  return <Countdown date={Date.now() + 60000} renderer={renderer} />;
}
