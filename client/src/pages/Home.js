import React from "react";
import { connect } from "react-redux";
import { getProfile } from "../ducks/authDuck";
import { fetchBudgets } from "../ducks/budgetDuck";
import { Button, Container, Modal, Card } from "semantic-ui-react";
import CreateBudgetForm from "../components/forms/CreateBudgetForm";
import BudgetCard from "../components/cards/BudgetCard";
import "./Home.scss";

class Home extends React.Component {
  state = {
    budgetModalIsOpen: false
  };
  componentDidMount() {
    this.props.getProfile();
    this.props.fetchBudgets();
  }

  openCreateBudgetModal = () => {
    this.setState({ budgetModalIsOpen: true });
  };

  closeCreateBudgetModal = () => {
    this.setState({ budgetModalIsOpen: false });
  };

  handleCreateBudgetComplete = () => {
    this.closeCreateBudgetModal();
    this.props.fetchBudgets();
  };
  render() {
    const { budgets } = this.props;
    const { budgetModalIsOpen } = this.state;
    const createBudgetButtonWithModal = (
      <Modal
        open={budgetModalIsOpen}
        onClose={this.closeCreateBudgetModal}
        trigger={
          <Button
            style={{ margin: "20px 0" }}
            onClick={this.openCreateBudgetModal}
            primary
          >
            + Create Budget
          </Button>
        }
      >
        <Modal.Content>
          <CreateBudgetForm onSubmitFinish={this.handleCreateBudgetComplete} />
        </Modal.Content>
      </Modal>
    );
    return (
      <Container>
        <div className="Home">
          <div className="greeting">Hello, {this.props.userProfile.name}!</div>
          {budgets && budgets.length > 0 && (
            <div>
              <Card.Group>
                {budgets.map(b => (
                  <BudgetCard {...b} key={b.id} />
                ))}
              </Card.Group>
              {createBudgetButtonWithModal}
            </div>
          )}
          {!budgets ||
            (budgets.length === 0 && (
              <div className="centerVH no-budgets">
                You don't have any budgets.
                <div>{createBudgetButtonWithModal}</div>
              </div>
            ))}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.auth.userProfile,
  budgets: state.budget.budgets
});
const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  fetchBudgets: () => dispatch(fetchBudgets())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
