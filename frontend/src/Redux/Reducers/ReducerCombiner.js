import Auth from "./AuthReducer";
import { combineReducers } from "redux";
const allreducers = combineReducers({
  Auth: Auth,
});
export default allreducers;
