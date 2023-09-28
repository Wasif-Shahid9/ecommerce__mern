import axios from "axios";

// Constants

const USER_LOGOUT_REQ = "USER_LOGOUT_REQ ";
const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
const USER_LOGOUT_FAIL = "USER_LOGOUT_FAIL";

// Reducer Functions

const initialState = {
  user: {},
};
export const userReducerLogout = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case USER_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
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
export const userActionLogout = () => {
  return async (dispatch, getState) => {
    try {
      await axios.get("http://localhost:4000/api/v1/logout");

      dispatch({ type: USER_LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: USER_LOGOUT_FAIL, payload: error });
    }
  };
};
