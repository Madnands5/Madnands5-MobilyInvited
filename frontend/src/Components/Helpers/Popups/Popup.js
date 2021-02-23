import React from "react";
import "./Popup.css";
import { Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

export default function Popup(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={props.showPopup}
        onClose={() => {
          props.toggleShowPopup(false);
        }}
      >
        <div className="modal-card">
          <CancelIcon
            onClick={() => {
              props.toggleShowPopup(false);
            }}
            color="secondary"
            className="popup-close"
          />
          <props.component className="modal-component" />
        </div>
      </Modal>
    </div>
  );
}
