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
import Eventlist from "./Components/Invitations/Info/Eventlist";
import ChatPage from "./Components/Chat/ChatPage";
function App() {
  const Auth = useSelector((state) => state.Auth);
  if (Auth.isLoggedIn === false) {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={MobileAuth} />

            <Route exact path="/" component={Landingpage} />
            <Route exact path="/*" component={Redirector} />
            <Route exact path="/event/:code/login" component={AddEvent} />
          </Switch>
        </div>
      </Router>
    );
  } else {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/add-event" component={ChatPage} />
            <Route exact path="/chat" component={ChatPage} />
            <Route exact path="/user-profile" component={AddEvent} />
            <Route exact path="/inv/RSVP/:id" component={Rsvp} />
            <Route exact path="/inv/info/:id" component={Eventlist} />
            <Route exact path="/add-event" component={AddEvent} />
            <Route exact path="/*" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
