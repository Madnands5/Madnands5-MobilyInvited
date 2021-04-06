import "./App.css";
import "./Colors.css";
import "./Responsive.css";
import "./Scrollbar.css";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Redirector from "./Utils/Routing";
import history from "./Utils/History";
import { useSelector } from "react-redux";
import MobileAuth from "./Components/Auth/MobileAuth";
import Landingpage from "./Components/LandingPage/Landingpage";
import Home from "./Components/Home/Home";
import AddEvent from "./Components/AddEvent/AddEvent";
import Rsvp from "./Components/Invitations/RSVP/Rsvp";
import Invitationlist from "./Components/Invitations/Info/Invitationlist";
import ChatPage from "./Components/Chat/ChatPage";
import AddEventSucess from "./Components/AddEvent/AddEventSucess";

function App() {
  const Auth = useSelector((state) => state.Auth);
  if (Auth.isLoggedIn === false) {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={MobileAuth} />
            <Route exact path="/" component={Landingpage} />
            {/* <Route exact path="/MyEvents" component={AddEvent} /> */}
            <Route exact path="/*" component={Redirector} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/MyEvents" component={Home} />
            <Route exact path="/MyInvitations" component={Home} />
            <Route
              exact
              path="/MyEvents/event-create-success/:id"
              component={AddEventSucess}
            />
            <Route exact path="/MyEvents/add-event" component={AddEvent} />
            <Route exact path="/chat" component={ChatPage} />
            <Route exact path="/user-profile" component={AddEvent} />
            <Route exact path="/inv/RSVP/:id" component={Rsvp} />
            <Route exact path="/inv/info/:id" component={Invitationlist} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/*" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
