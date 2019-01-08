import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.scss";

class Navbar extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="Navbar">
        <div className="Navbar__image">
          <Link to={isLoggedIn ? "/" : "/login"}>
            <img alt="LOGO" src="/assets/logo.png" />
          </Link>
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
