import Auth from "./AuthReducer";
import { combineReducers } from "redux";
import Eventdata from "./EventReducer";
import CreateEventForm from "./CreateEventFormReducer";
const allreducers = combineReducers({
  Auth: Auth,
  Eventdata: Eventdata,
  CreateEventForm: CreateEventForm,
});
export default allreducers;
