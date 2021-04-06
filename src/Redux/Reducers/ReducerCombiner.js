import Auth from "./AuthReducer";
import { combineReducers } from "redux";
import Eventdata from "./EventReducer";
const allreducers = combineReducers({
  Auth: Auth,
  Eventdata: Eventdata,
});
export default allreducers;
