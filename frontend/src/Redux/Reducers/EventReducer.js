import { reactLocalStorage } from "reactjs-localstorage";

const initialState = {
  ALBUM: [],
  STORY: [],
  myEvents: [],
  myInvitations: [],
};

const Eventdata = (state = initialState, action) => {
  switch (action.type) {
    case "SAVEALBUM":
      return {
        ...state,
        ALBUM: action.payload,
      };
    case "DELETEALBUM":
      return {
        ...state,
        ALBUM: [],
      };
    case "SAVESTORY":
      return {
        ...state,
        STORY: action.payload,
      };
    case "DELETESTORY":
      return {
        ...state,
        STORY: [],
      };
    case "GOTMYEVENTS":
      return {
        ...state,
        myEvents: action.payload,
      };
    case "GETMYINVITAITONS":
      return {
        ...state,
        myInvitations: action.payload,
      };
    default:
      return state;
  }
};
export default Eventdata;
