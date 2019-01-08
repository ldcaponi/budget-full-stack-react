import { combineReducers } from "redux";
import authReducer from "./authDuck";
import budgetReducer from "./budgetDuck";

export default combineReducers({
  auth: authReducer,
  budget: budgetReducer
});
