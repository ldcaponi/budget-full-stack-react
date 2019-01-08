import React from "react";
import { Button, Form, Message, Input, Label } from "semantic-ui-react";
import { login } from "../../ducks/authDuck";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    name: "",
    amount: "",
    startDay: "",
    errorMessage: "",
    loading: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "" }, () => {
      const { name, amount, startDay } = this.state;
      axios
        .post("/api/budgets", { name, amount, startDay })
        .then(res => {
          this.setState({ loading: false });
          if (this.props.onSubmitFinish) {
            this.props.onSubmitFinish();
          }
        })
        .catch(err => {
          this.setState({ loading: false, errorMessage: "An error occurred" });
        });
    });
  };

  render() {
    const { name, amount, startDay, loading, errorMessage } = this.state;

    return (
      <Form loading={loading} error={!!errorMessage}>
        <h2>Create Budget</h2>
        <Form.Field>
          <label>Name</label>
          <input
            onChange={this.handleChange}
            name="name"
            value={name}
            placeholder="My Awesome Budget"
          />
        </Form.Field>
        <Form.Field>
          <label>Amount</label>
          <Input labelPosition="right" type="text" placeholder="1200">
            <Label basic>$</Label>
            <input onChange={this.handleChange} name="amount" value={amount} />
            <Label>.00</Label>
          </Input>
        </Form.Field>
        <Form.Field>
          <label>Day of Month to Start</label>
          <input
            onChange={this.handleChange}
            name="startDay"
            value={startDay}
            placeholder="3"
          />
        </Form.Field>

        <Message error header="Error" content={errorMessage} />

        <Button onClick={this.submit} type="button">
          Submit
        </Button>
      </Form>
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
