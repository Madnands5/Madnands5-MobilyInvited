import { reactLocalStorage } from "reactjs-localstorage";

const initialState = {
  ALBUM: [],
  STORY: [],
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
    default:
      return state;
  }
};
export default Eventdata;
