import axios from "axios";
import { url } from "../../Utils/Config";
import { EVENTSAVED, EVENTSAVEFAIL } from "../Actions/EventActions";
export function saveEvent(edata) {
  return (dispatch) => {
    axios.post(url + "event/create", edata).then((res) => {
      console.log(res);
    });
  };
}
