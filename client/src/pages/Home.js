import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../ducks/authDuck";

class Home extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    return <div className="Home">Hello, {this.props.userProfile.name}</div>;
  }
}

const mapStateToProps = state => ({ userProfile: state.auth.userProfile });
const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
