import React, { useEffect, useState } from "react";
import Access from "../../../Assets/AddAccess.svg";
import "../AddEvent.css";
import { Grid, Switch } from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import { useDispatch, useSelector } from "react-redux";
import { saveEvent } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import { uploadString } from "../../../Utils/FileUpload_Download";
import EventNameBox from "../CreateEvent/EventNameBox";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddParticipants(props) {
  const dispatch = useDispatch();
  const Eventdata = useSelector((state) => state.Eventdata);

  console.log(Eventdata);
  let supported = "";
  let attribute = ["name", "tel"];
  const opts = { multiple: true };
  let Eventscpy = [...props.Events];
  const [isMobile, SetIsMobile] = useState(false);
  const [selectedEvent, setselectedEvent] = useState(0);
  const [forallparticipants, setforallparticipants] = useState(true);
  const [save, Setsave] = useState(false);
  let Albumcpy = [];
  let Storycpy = [];
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
      let number = "";
      const contacts = await navigator.contacts.select(attribute, opts);
      console.log(contacts);
      contacts.map(async (contact) => {
        if (contact.tel.length > 1) {
          contact.tel.map(async (numb) => {
            number = numb.split(" ");
            if (number && number.length > 1) {
              number = number.join("");
            } else {
            }
            await list.push(number);
          });
        } else {
          await list.push(contact.tel[0]);
        }
      });
      console.log(list);
      await saverecipeients(list, "Number");
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
    debugger;
    await Setsave(true);
    let uniqueurl =
      props.Type + Math.floor(100000 + Math.random() * 900000) + "/";

    let EventCpy = [...props.Events];
    let MainCode = "";
    for (let i = 0; i < EventCpy.length; i++) {
      //remove this code when adding "use code insted button"
      if (EventCpy[i].Participants.length === 0) {
        return false;
      }
      let furl =
        uniqueurl +
        "Event_image/" +
        i +
        EventCpy[i].Name +
        "." +
        EventCpy[i].filetype;

      await console.log(furl);
      let url = await uploadString(EventCpy[i].file, furl);
      await console.log(url);
      EventCpy[i].file = url;

      // if (EventCpy[i].Schedule.length > 0) {
      //   for (let j = 0; j < EventCpy[i].Schedule.length; j++) {
      //     let shurl =
      //       uniqueurl +
      //       "Schedule/" +
      //       j +
      //       EventCpy[i].Name +
      //       "." +
      //       EventCpy[i].Schedule[j].filetype;

      //     let url = await uploadString(EventCpy[i].Schedule[j].file, shurl);
      //     EventCpy[i].Schedule[i].file = url;
      //   }

      //   console.log(EventCpy[i].Schedule);
      // }
    }

    await props.setEvents(EventCpy);

    if (Eventdata && Eventdata.ALBUM && Eventdata.ALBUM.length > 0) {
      Albumcpy = [];
      for (let i = 0; i < Eventdata.ALBUM.length; i++) {
        let shurl =
          uniqueurl +
          "Album/" +
          i +
          EventCpy[i].Name +
          "." +
          Eventdata.ALBUM[i].type;

        let url = await uploadString(Eventdata.ALBUM[i].data, shurl);
        Eventdata.ALBUM[i].file = url;
        await Albumcpy.push({ file: url, type: Eventdata.ALBUM[i].type });
      }
      console.log(Albumcpy);
    }

    if (Eventdata && Eventdata.STORY && Eventdata.STORY.length > 0) {
      Storycpy = [];
      for (let i = 0; i < Eventdata.STORY.length; i++) {
        let shurl =
          uniqueurl +
          "Story/" +
          i +
          EventCpy[i].Name +
          "." +
          Eventdata.STORY[i].type;

        let url = await uploadString(Eventdata.STORY[i].file, shurl);
        Eventdata.STORY[i].file = url;
        await Storycpy.push({
          ...Eventdata.STORY[i],
          file: url,
          type: Eventdata.STORY[i].type,
        });
      }
      console.log(Storycpy);
    }
    console.log({
      Type: props.Type,
      Events: EventCpy,
      Album: Albumcpy,
      story: Storycpy,
    });
    console.log("dispatching");
    await dispatch(
      saveEvent({
        Type: props.Type,
        Events: EventCpy,
        Album: Albumcpy,
        Story: Storycpy,
      })
    );
  };

  function SingleEventParticipants() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12}>
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
            htmlFor="input"
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
      {save === true ? <CircularProgress className="Progress" /> : <></>}
      <img src={Access} className="access-logo mt-10px" />
      <b className="tac w-100 b mt-10px">
        Give access to your guest or Upload CSV with for group access
      </b>
      <h2>
        {/* Add Guest List (
        {forallparticipants === true
          ? "Single Guest List for all events"
          : "One  Guest List Per Event"}
        ) */}
        {/* <Switch
          checked={forallparticipants}
          onChange={() => {
            setforallparticipants(!forallparticipants);
          }}
          name="checkedB"
          color="primary"
        /> */}
      </h2>

      {forallparticipants === true ? (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <button
              className="custom-file-upload mt-10px"
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
              className="excel-file-upload mt-10px"
              style={{ display: isMobile === false ? "block" : "none" }}
            >
              Upload Excel
            </label>
            <input
              type="file"
              id="input"
              className="upload-excel mt-10px"
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

      {/* <button
        className="dark-file-upload"
        onClick={() => {
          saverecipeients([], "code");
        }}
      >
        Skip and use Code for Invitation Instead
      </button> */}
      <Grid item xs={6}>
        <button
          className="back mt-10px"
          onClick={() => {
            props.handleBack();
          }}
        >
          Back
        </button>
      </Grid>
      <Grid item xs={6}>
        <button
          className="next mt-10px"
          onClick={() => {
            create_event();
          }}
        >
          Next
        </button>
      </Grid>
      <p className="w-100 tac mt-10px">
        <b>
          <u>Note</u>
        </b>
        :{"CSV can only be accessed by using website "}
        {/* {isMobile === true
          ? "Select your Invitees. "
          : "Upload list of Invitees-watsapp numbers with their country code. "}
        Or <u>Generate Event Code</u> to Send invitation  */}
      </p>
    </Grid>
  );
}
