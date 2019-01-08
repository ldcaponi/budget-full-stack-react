import React from "react";
import { Button, Card } from "semantic-ui-react";

const BudgetCard = props => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>${props.amount}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button floated="right" basic primary>
          View Details
        </Button>
      </Card.Content>
    </Card>
  );
};

export default BudgetCard;
