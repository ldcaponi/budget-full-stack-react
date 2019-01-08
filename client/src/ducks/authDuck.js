import axios from "axios";
axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";

export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const SIGNUP_INIT = "SIGNUP_INIT";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const GET_PROFILE_INIT = "GET_PROFILE_INIT";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";

export const setAuthHeaders = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthHeaders = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const login = (data, history) => dispatch => {
  dispatch({ type: LOGIN_INIT });
  axios
    .post("/api/auth/login", data)
    .then(res => {
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthHeaders(token);
      }
      dispatch({ type: LOGIN_SUCCESS });
      history.push("/");
    })
    .catch(err => {
      localStorage.removeItem("token");
      removeAuthHeaders();
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.message || "Error logging in"
      });
    });
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  removeAuthHeaders();
  dispatch({ type: LOGIN_ERROR, payload: "" });
};

export const signUp = (data, history) => dispatch => {
  dispatch({ type: SIGNUP_INIT });
  axios
    .post("/api/auth/signup", data)
    .then(res => {
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthHeaders(token);
      }
      dispatch({ type: SIGNUP_SUCCESS });
      history.push("/");
    })
    .catch(err => {
      localStorage.removeItem("token");
      removeAuthHeaders();
      dispatch({
        type: SIGNUP_ERROR,
        payload: err.response.data.message || "Error signing up"
      });
    });
};

export const getProfile = data => dispatch => {
  dispatch({ type: GET_PROFILE_INIT });
  axios
    .get("/api/auth/me", data)
    .then(res => {
      dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      localStorage.removeItem("token");
      removeAuthHeaders();
      dispatch({ type: GET_PROFILE_ERROR, payload: "Error fetching profile" });
    });
};

const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  signUpLoading: false,
  loginError: "",
  signUpError: "",
  profileLoading: false,
  profileError: false,
  userProfile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return { ...state, loginLoading: true, loginError: "", signUpError: "" };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        isLoggedIn: true,
        loginError: ""
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
        loginLoading: false,
        isLoggedIn: false
      };
    case SIGNUP_INIT:
      return { ...state, signUpLoading: true, signUpError: "", loginError: "" };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        isLoggedIn: true,
        signUpError: ""
      };
    case SIGNUP_ERROR:
      return { ...state, signUpError: action.payload, signUpLoading: false };
    case GET_PROFILE_INIT:
      return { ...state, profileLoading: true, profileError: false };
    case GET_PROFILE_SUCCESS:
      return { ...state, profileLoading: false, userProfile: action.payload };
    case GET_PROFILE_ERROR:
      return { ...state, profileLoading: false, profileError: action.payload };
    default:
      return state;
  }
};
