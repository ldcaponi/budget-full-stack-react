import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function mustBeLoggedIn(Wrapped) {
  class ProtectedComponent extends React.Component {
    render() {
      const { isLoggedIn } = this.props;
      return (
        <>
          {isLoggedIn && <Wrapped />}
          {!isLoggedIn && <Redirect to="/login" />}
        </>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isLoggedIn: state.auth.isLoggedIn
    };
  };
  return connect(mapStateToProps)(ProtectedComponent);
}
