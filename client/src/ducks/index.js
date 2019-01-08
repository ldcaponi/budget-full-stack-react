import { combineReducers } from "redux";
import authReducer from "./authDuck";

export default combineReducers({
  auth: authReducer
});
