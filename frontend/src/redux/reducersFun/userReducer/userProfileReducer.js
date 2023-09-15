import axios from "axios";

// Constants

const USER_PROFILE_REQ = "USER_PROFILE_REQ";
const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
const USER_PROFILE_FAIL = "USER_PROFILE_FAIL";

// Reducer Functions

const initialState = {
  user: {},
};
export const userReducerProfile = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQ:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// Action Creators
export const userActionProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_PROFILE_REQ });

      const { data } = await axios.get("http://localhost:4000/api/v1/me");

      dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_PROFILE_FAIL, payload: error });
    }
  };
};
