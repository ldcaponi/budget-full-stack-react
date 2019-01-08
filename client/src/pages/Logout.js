import { connect } from "react-redux";
import { logout } from "../ducks/authDuck";
import { withRouter } from "react-router-dom";

const Logout = props => {
  props.logout();
  props.history.push("/login");
  return null;
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Logout));
