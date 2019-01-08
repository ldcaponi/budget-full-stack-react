import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import "./BudgetDetail.scss";

class BudgetDetail extends React.Component {
  state = {
    budget: {},
    loading: false,
    error: ""
  };
  componentDidMount() {
    const { budgetId } = this.props.match.params;
    this.fetchBudget(budgetId);
  }

  fetchBudget = id => {
    this.setState({ loading: true });
    axios
      .get(`/api/budgets/${id}`)
      .then(res => {
        this.setState({ loading: false, budget: res.data });
      })
      .catch(err => {
        this.setState({ loading: false, error: "A problem occurred" });
      });
  };
  render() {
    const { loading } = this.state;
    return (
      <Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <div className="BudgetDetail">{JSON.stringify(this.state.budget)}</div>
      </Container>
    );
  }
}

export default withRouter(BudgetDetail);
