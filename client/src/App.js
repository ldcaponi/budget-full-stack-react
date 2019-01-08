import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import mustBeLoggedIn from "./components/hoc/mustBeLoggedIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />

            <Route exact path="/" component={() => "Home"} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={() => "Signup"} />
            <Route
              exact
              path="/dashboard"
              component={mustBeLoggedIn(Dashboard)}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
