import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.scss";

class Navbar extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="Navbar">
        <div className="Navbar__image">IMG</div>
        <div className="Navbar__links-left">
          <Link to="/">Home</Link>

          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
        </div>

        <div className="Navbar__links-right">
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/signup">Signup</Link>}
          {isLoggedIn && <Link to="/logout">Logout</Link>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(withRouter(Navbar));
