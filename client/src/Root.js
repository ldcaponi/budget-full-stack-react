import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import React from "react";
import rootReducer from "./ducks";
import { setAuthHeaders, LOGIN_SUCCESS } from "./ducks/authDuck";

const Root = props => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    props.initialState
  );

  if (localStorage && localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    setAuthHeaders(token);
    store.dispatch({ type: LOGIN_SUCCESS });
  }
  return <Provider store={store}>{props.children}</Provider>;
};

export default Root;
