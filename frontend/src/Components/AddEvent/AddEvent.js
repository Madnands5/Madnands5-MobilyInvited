import React, { useState, useEffect } from "react";
import "./AddEvent.css";
import Header from "../Helpers/Header/Header";
import { Grid } from "@material-ui/core";
import HorizontalLinearStepper from "./Stepper/Stepper";
import CreateEvent from "./CreateEvent/CreateEvent";
import AddParticipants from "../AddEvent/AddParticipants/AddParticipants";
import uuid from "react-uuid";

export default function AddEvent(props) {
  const [Type, setType] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  let MainEvent = uuid();
  const [Events, setEvents] = useState([]);

  let events = {
    Name: "Event " + (Events.length + 1 || "1"),
    Participants: [],
    file: "",
    filetype: "",
    Date: "",
    Time: "",
    VenueType: "Offline",
    Location: "",
    Description: "",
    MainCode: MainEvent,
    eventCode: MainEvent + "event" + Events.length,
    GuestInvite: false,
    Host: "",
    Co_Host: [],
    Schedule: [],
  };
  const [SelectedEvent, SelectEvent] = useState(0);
  const [Album, setAlbum] = useState([]);
  const [Story, setStory] = useState([]);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const addAnEvent = async () => {
    if (Events.length < 4) {
      setEvents([...Events, events]);
    }
  };
  const removeAnEvent = async () => {
    let events = [...Events];
    if (events.length > 1) {
      events = events.slice(0, -1);
      await setEvents(events);
    }

    if (SelectedEvent > events.length - 1) {
      console.log(SelectedEvent - 1);
      SelectEvent(SelectedEvent - 1);
      console.log(SelectedEvent, events.length - 1);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkIfEventEmpty = async (eventscpy) => {
    console.log(Events);
    let Eventcpy = [...Events];
    let result = true;
    let incompleteeventnumber = null;

    for (let i = 0; i < Events.length; i++) {
      incompleteeventnumber = i;
      Eventcpy = { ...Events[i] };
      if (Eventcpy.Name === "Event " + (i + 1) || Eventcpy.Name === "") {
        return { status: false, index: i, component: "Name" };
      } else if (Eventcpy.Date === "") {
        return { status: false, index: i, component: "Date" };
      } else if (Eventcpy.Time === "") {
        return { status: false, index: i, component: "Time" };
      } else if (Eventcpy.Description === "") {
        return { status: false, index: i, component: "Description" };
      } else if (Eventcpy.VenueType === "") {
        return { status: false, index: i, component: "VenueType" };
      } else if (Eventcpy.Location === "") {
        return { status: false, index: i, component: "Location" };
      } else if (Eventcpy.MainCode === "") {
        return { status: false, index: i, component: "MainCode" };
      } else if (Eventcpy.file === "") {
        return { status: false, index: i, component: "Name" };
      } else if (Eventcpy.filetype === "") {
        return { status: false, index: i, component: "Name" };
      }
      await "next";
    }

    return { status: result, index: null };
  };

  const addfinalDetails = () => {
    let EventsCopy = [...Events];
    EventsCopy.map((eve, index) => {
      if (index === 0) {
        eve.MainCode = "ME" + 313213132313;
        eve.eventCode = "ME" + 313213132313;
        eve.Link = "dsd/as3213";
        //mainevent will give acces to all
      } else {
        eve.MainCode = "ME" + 313213132313;
        eve.eventCode = "E" + "randomcode";
        eve.Link = "dsd/as3213/sdse";
        //single event access link
      }
    });
    setEvents(EventsCopy);
  };

  useEffect(async () => {
    addAnEvent();
  }, []);

  function StepRender(step) {
    switch (step.activeStep) {
      case 0:
        return (
          <CreateEvent
            setType={setType}
            Type={Type}
            Events={Events}
            setEvents={setEvents}
            addAnEvent={addAnEvent}
            checkIfEventEmpty={checkIfEventEmpty}
            handleChange={handleChange}
            removeAnEvent={removeAnEvent}
            SelectEvent={SelectEvent}
            SelectedEvent={SelectedEvent}
            handleNext={handleNext}
            handleBack={handleBack}
            addfinalDetails={addfinalDetails}
            Album={Album}
            setAlbum={setAlbum}
            Story={Story}
            setStory={setStory}
            template={events}
          />
        );
      case 1:
        return (
          <div>
            <h1>Payments</h1>
            <button
              className="custom-file-upload"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <AddParticipants
            handleNext={handleNext}
            handleBack={handleBack}
            Events={Events}
            setEvents={setEvents}
            SelectEvent={SelectEvent}
            SelectedEvent={SelectedEvent}
            addAnEvent={addAnEvent}
            removeAnEvent={removeAnEvent}
            addfinalDetails={addfinalDetails}
            Type={Type}
          />
        );
      case 3:
        return <div></div>;
      default:
        return <div></div>;
    }
  }

  return (
    <>
      <Header url={props.location.pathname} />
      <Grid container spacing={0} className="p-15px">
        <Grid item xs={false} sm={2} md={2} />
        <Grid item xs={12} sm={8} md={8} className="p-15px">
          <HorizontalLinearStepper
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
          />
          <StepRender activeStep={activeStep} />
        </Grid>

        <Grid item xs={false} sm={2} md={2} />
      </Grid>
    </>
  );
}
