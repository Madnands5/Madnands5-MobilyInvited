import axios from "axios";
import { url } from "../../Utils/Config";
import { EVENTSAVED, EVENTSAVEFAIL } from "../Actions/EventActions";
import history from "../../Utils/History";
export function saveEvent(edata) {
  return (dispatch) => {
    console.log(edata);
    axios.post(url + "event/create", edata).then((res) => {
      console.log(res);
      history.push("/home");
    });
  };
}
