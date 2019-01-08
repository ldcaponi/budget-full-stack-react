import React from "react";
import { Button, Form } from "semantic-ui-react";
import { login } from "../ducks/authDuck";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password }, this.props.history);
  };

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;
    return (
      <div className="Login">
        <Form loading={loginLoading}>
          <Form.Field>
            <label>Email</label>
            <input
              onChange={this.handleChange}
              name="email"
              value={email}
              placeholder="Email"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              value={password}
              placeholder="Password"
            />
          </Form.Field>

          <Button onClick={this.submit} type="button">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginLoading: state.auth.loginLoading,
    loginError: state.auth.loginError,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (data, history) => {
      dispatch(login(data, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
