import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { signUp } from "../ducks/authDuck";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./SignUp.scss";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    this.setState({ errorMessage: "" });
    const { email, password, confirmPassword, name } = this.state;

    this.props.signUp(
      { email, password, confirmPassword, name },
      this.props.history
    );
  };

  render() {
    const { email, password, confirmPassword, name } = this.state;
    const { signUpLoading, signUpError } = this.props;
    return (
      <div className="SignUp">
        <div className="form-container">
          <Form loading={signUpLoading} error={!!signUpError}>
            <h2>SignUp</h2>
            <Form.Field>
              <label>Name</label>
              <input
                onChange={this.handleChange}
                name="name"
                value={name}
                placeholder="John Doe"
              />
            </Form.Field>
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
            <Form.Field>
              <label>Confirm Password</label>
              <input
                onChange={this.handleChange}
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
              />
            </Form.Field>

            <Message error header="Error" content={signUpError} />

            <Button onClick={this.submit} type="button">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signUpLoading: state.auth.signUpLoading,
    signUpError: state.auth.signUpError,
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (data, history) => {
      dispatch(signUp(data, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
