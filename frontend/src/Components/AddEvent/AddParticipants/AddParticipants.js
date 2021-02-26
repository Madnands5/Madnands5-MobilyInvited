import React, { useEffect, useState } from "react";
import Access from "../../../Assets/AddAccess.svg";
import "../AddEvent.css";
import { Grid, Switch } from "@material-ui/core";
import readXlsxFile from "read-excel-file";
import { useDispatch, useSelector } from "react-redux";
import { saveEvent } from "../../../Redux/DispatchFuncitons/Eventfunctions";
import { uploadString } from "../../../Utils/FileUpload_Download";
import EventNameBox from "../CreateEvent/EventNameBox";
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
    debugger;
    let EventCpy = [...props.Events];
    let MainCode = "";
    EventCpy.map(async (even, index) => {
      console.log(even);
      MainCode = even.MainCode;
      let furl = even.MainCode + "/" + even.eventCode + "." + even.filetype;
      await console.log(furl);
      let url = await uploadString(even.file, furl);
      await console.log(url);
      EventCpy[index].file = url;
      if (even.Schedule.lenght > 0) {
        let Schdulecpy = [...even.Schedule];
        even.Schedule.map(async (sh, i) => {
          let shurl =
            even.MainCode +
            "/" +
            even.eventCode +
            i +
            "th_Schedule." +
            sh.filetype;
          let url = await uploadString(sh.file, shurl);
          EventCpy[index].Schedule[i].file = url;
        });

        console.log(even.Schedule);
      }
    });

    await props.setEvents(EventCpy);
    console.log({ Events: props.Events });

    if (Eventdata && Eventdata.ALBUM && Eventdata.ALBUM.length > 0) {
      Eventdata.ALBUM.map(async (al, i) => {
        let shurl = MainCode + "/" + i + "th_Album." + al.type;
        let url = await uploadString(al.data, shurl);
        al.file = url;
        await Albumcpy.push({ file: url, type: al.type });
      });

      console.log(Albumcpy);
    }
    if (Eventdata && Eventdata.STORY && Eventdata.STORY.length > 0) {
      Eventdata.STORY.map(async (st, i) => {
        let shurl = MainCode + "/" + i + "th_Album." + st.type;
        let url = await uploadString(st.data, shurl);
        st.file = url;
        await Storycpy.push({ file: url, type: st.type });
      });
      console.log(Storycpy);
    }
    console.log({
      Type: props.Type,
      Events: EventCpy,
      Album: Albumcpy,
      story: Storycpy,
    });
    await dispatch(
      saveEvent({
        Type: props.Type,
        Events: EventCpy,
        Album: Albumcpy,
        story: Storycpy,
      })
    );
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
          onClick={() => {
            create_event();
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
