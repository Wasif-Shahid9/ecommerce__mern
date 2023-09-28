import axios from "axios";

// Constants

const USER_LOGIN_REQ = "USER_LOGIN_REQ ";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
const CLEAR_ERRORS = "CLEAR_ERRORS";

// Reducer Functions

const initialState = {
  user: {},
};
export const userReducerLogin = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
// Action Creators
export const userActionLogin = (userData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQ });

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/login",
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error });
    }
  };
};
