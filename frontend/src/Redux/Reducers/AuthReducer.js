import { reactLocalStorage } from "reactjs-localstorage";

const initialState = {
  isLoggedIn: false,
  Phone: "",
  userDetails: {},
  Message: "",
  OTPStatus: false,
  isVerified: false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGINFAIL":
      return {
        ...state,
        Message: action.payload,
      };
    case "LOGINSUCCESS":
      reactLocalStorage.set("isLoggedIn", true);
      reactLocalStorage.set("Phone", action.payload.user.Phone);
      reactLocalStorage.set("Token", action.payload.token);
      return {
        ...state,
        isLoggedIn: true,
        Phone: action.payload.user.Phone,
        Token: action.payload.token,
        Message: "",
      };
    case "LOGOUT":
      reactLocalStorage.clear();
      return {
        isLoggedIn: false,
        Phone: "",
        Token: "",
        userDetails: {},
        OTPStatus: false,
        isVerified: false,
      };
    case "GOTOTP": {
      return {
        ...state,
        OTPStatus: true,
        isVerified: false,
      };
    }
    case "INVALIDNUMBER": {
      return {
        ...state,
        OTPStatus: false,
        isVerified: false,
        Message: "Invalid Input",
      };
    }
    case "OTPVERIFIED": {
      return {
        ...state,
        OTPStatus: true,
        isVerified: true,
        Message: "",
      };
    }
    case "OPTEXPIRED": {
      return {
        ...state,
        OTPStatus: true,
        isVerified: false,
        Message: "Invalid Input",
      };
    }
    default:
      return state;
  }
};
export default Auth;
