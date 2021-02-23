import React, { useEffect, useState } from "react";
import Access from "../../../Assets/AddAccess.svg";
import "../AddEvent.css";
import { Grid, Switch } from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import { useDispatch } from "react-redux";
import { saveEvent } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import { uploadString } from "../../../Utils/FileUpload_Download";
import EventNameBox from "../CreateEvent/EventNameBox";
export default function AddParticipants(props) {
  const dispatch = useDispatch();
  let supported = "";
  let attribute = ["name", "tel"];
  const opts = { multiple: true };
  let Eventscpy = [...props.Events];
  const [isMobile, SetIsMobile] = useState(false);
  const [selectedEvent, setselectedEvent] = useState(0);
  const [forallparticipants, setforallparticipants] = useState(true);
  useEffect(async () => {
    supported = "contacts" in navigator && "ContactsManager" in window;
    console.log(supported);
    if (supported === true) {
      SetIsMobile(true);
    } else {
      SetIsMobile(false);
    }
  }, []);
  const openContactPicker = async () => {
    try {
      let list = [];
      const contacts = await navigator.contacts.select(attribute, opts);
      console.log(contacts);
      contacts.map((contact) => {
        if (contact.tel.length > 1) {
          contact.tel.map((numb) => {
            list.push(numb);
          });
        } else {
          list.push(contact.tel[0]);
        }
      });
      console.log(list);
      saverecipeients(list, "Number");
    } catch (err) {
      console.log(err);
    }
  };
  function readexcel(file) {
    let allcontacts = [];
    let row = [];
    readXlsxFile(file).then(async (rows) => {
      await rows.map((row) => {
        allcontacts.push(row[0]);
      });
    });
    console.log(allcontacts);
    saverecipeients(allcontacts, "Number");
  }

  const saverecipeients = async (data, type) => {
    let EventCpy = [...props.Events];
    if (forallparticipants === true) {
      await EventCpy.map((eve) => {
        eve.Participants = data;
        eve.authtype = type;
      });
      console.log(EventCpy);
    } else {
      await EventCpy.map((eve, index) => {
        if (index === selectedEvent) {
          eve.Participants = data;
          eve.authtype = type;
        }
      });
      console.log(EventCpy);
    }
    if (selectedEvent + 1 < EventCpy.length) {
      setselectedEvent(selectedEvent + 1);
    }

    await props.setEvents(EventCpy);
  };

  const create_event = async () => {
    let EventCpy = [...props.Events];
    debugger;
    for (let i = 0; i < EventCpy.length; i++) {
      let url =
        EventCpy[i].MainCode +
        "/" +
        EventCpy[i].eventCode +
        "." +
        EventCpy[i].filetype;
      let newurl = await uploadString(EventCpy[i].file, url);
      EventCpy[i].file = newurl;
      await console.log(EventCpy[i]);
    }
    await props.setEvents(EventCpy);
    await props.handleNext();
    console.log({ Events: props.Events });
    await dispatch(saveEvent({ Type: props.Type, Events: props.Events }));
  };

  function SingleEventParticipants() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12}>
          {" "}
          <EventNameBox
            data={props.Events}
            setEvents={props.setEvents}
            SelectEvent={setselectedEvent}
            SelectedEvent={selectedEvent}
            className="w-100"
          />
        </Grid>
        <Grid item xs={8} sm={8}>
          {/* <FormControl className="w-100">
            <InputLabel id="demo-simple-select-label">CopyFrom</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              {props.Events.map((eve, index) => {
                eve.Participants.length > 0 ? (
                  <MenuItem
                    value={eve.Name}
                    onClick={() => {
                      copyfromevent(selectedEvent, index);
                    }}
                  >
                    eve.Name
                  </MenuItem>
                ) : (
                  <></>
                );
              })}
            </Select>
          </FormControl> */}
        </Grid>

        <Grid item xs={12} sm={12}>
          <button
            className="custom-file-upload"
            style={{ display: isMobile === true ? "block" : "none" }}
            onClick={() => {
              openContactPicker();
            }}
          >
            PhoneBook
          </button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <label
            for="input"
            className="excel-file-upload"
            style={{ display: isMobile === false ? "block" : "none" }}
          >
            Upload Excel
          </label>
          <input
            type="file"
            id="input"
            className="upload-excel"
            onChange={(e) => {
              readexcel(e.target.files[0]);
            }}
            style={{ display: isMobile === false ? "block" : "none" }}
            multiple={false}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={0}>
      <img src={Access} className="access-logo" />
      <div className="tac w-100">
        Give access to your guest or Upload CSV with for group access
      </div>
      <h2>
        Add Guest List (
        {forallparticipants === true
          ? "Single Guest List for all events"
          : "One  Guest List Per Event"}
        )
        <Switch
          checked={forallparticipants}
          onChange={() => {
            setforallparticipants(!forallparticipants);
          }}
          name="checkedB"
          color="primary"
        />
      </h2>

      {forallparticipants === true ? (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <button
              className="custom-file-upload"
              style={{ display: isMobile === true ? "block" : "none" }}
              onClick={() => {
                openContactPicker();
              }}
            >
              PhoneBook
            </button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <label
              for="input"
              className="excel-file-upload"
              style={{ display: isMobile === false ? "block" : "none" }}
            >
              Upload Excel
            </label>
            <input
              type="file"
              id="input"
              className="upload-excel"
              onChange={(e) => {
                readexcel(e.target.files[0]);
              }}
              style={{ display: isMobile === false ? "block" : "none" }}
              multiple={false}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Grid>
        </Grid>
      ) : (
        <SingleEventParticipants />
      )}

      <button
        className="dark-file-upload"
        onClick={() => {
          saverecipeients([], "code");
          props.handleNext();
        }}
      >
        Skip and use Code for Invitation Instead
      </button>
      <Grid item xs={6}>
        <button
          className="back"
          onClick={() => {
            props.handleBack();
          }}
        >
          Back
        </button>
      </Grid>
      <Grid item xs={6}>
        <button
          className="next"
          onClick={async () => {
            await create_event();
          }}
        >
          Next
        </button>
      </Grid>
      <p className="w-100 tac">
        <b>
          <u>Note</u>
        </b>
        :{" "}
        {isMobile === true
          ? "Select your Invitees. "
          : "Upload list of Invitees-watsapp numbers with their country code. "}
        Or <u>Generate Event Code</u> to Send invitation
      </p>
    </Grid>
  );
}
