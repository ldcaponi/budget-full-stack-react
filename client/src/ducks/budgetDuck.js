import axios from "axios";

export const FETCH_BUDGETS_INIT = "FETCH_BUDGETS_INIT";
export const FETCH_BUDGETS_ERROR = "FETCH_BUDGETS_ERROR";
export const FETCH_BUDGETS_SUCCESS = "FETCH_BUDGETS_SUCCESS";

export const fetchBudgets = () => dispatch => {
  dispatch({ type: FETCH_BUDGETS_INIT });
  axios
    .get("/api/budgets")
    .then(res => {
      dispatch({ type: FETCH_BUDGETS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BUDGETS_ERROR,
        payload: err.response.data.message || "Could not retrieve budgets"
      });
    });
};

const initialState = {
  budgets: [],
  budgetsLoading: false,
  budgetsError: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUDGETS_INIT:
      return { ...state, budgetsLoading: true, budgetsError: "" };

    case FETCH_BUDGETS_ERROR:
      return { ...state, budgetsLoading: false, budgetsError: action.payload };

    case FETCH_BUDGETS_SUCCESS:
      return {
        ...state,
        budgetsError: "",
        budgets: action.payload,
        budgetsLoading: false
      };
    default:
      return state;
  }
}
