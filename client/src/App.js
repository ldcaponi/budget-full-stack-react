import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import BudgetDetail from "./pages/BudgetDetail";
import Navbar from "./components/navbar/Navbar";
import mustBeLoggedIn from "./components/hoc/mustBeLoggedIn";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />

            <Route exact path="/" component={mustBeLoggedIn(Home)} />
            <Route
              exact
              path="/budget/:budgetId"
              component={mustBeLoggedIn(BudgetDetail)}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
