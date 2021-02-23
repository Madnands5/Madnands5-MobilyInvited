import React, { useState } from "react";
// import firebase from "../../Utils/Firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function MobileAuth() {
  const [number, setnumber] = useState(0);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   let phone = "+" + number.toString();
  //   let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");

  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(phone, recaptcha)
  //     .then(function (e) {
  //       let code = prompt("enter the otp", "");
  //       if (code === null) return;
  //       e.confirm(code)
  //         .then(function (result) {
  //           console.log(result.user);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     });
  // };
  return (
    <div>
      <div id="recaptcha-container"></div>
      <form>
        <PhoneInput
          country={"in"}
          value={number}
          onChange={(phone) => setnumber(phone)}
        />

        <button className="get-otp-button">Try Now</button>
      </form>
    </div>
  );
}
