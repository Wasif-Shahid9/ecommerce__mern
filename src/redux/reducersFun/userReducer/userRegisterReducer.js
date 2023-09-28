import axios from "axios";

// Constants

const USER_REGISTER_REQ = "USER_CREATE";
const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";

// Reducer Functions

const initialState = {
  user: {},
};
export const userReducerRegister = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQ:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.userData,
      };
    case USER_REGISTER_FAIL:
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
export const userActionRegister = (userData) => {
  ("userData", userData);
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REGISTER_REQ });
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ("data", response);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
      const { response } = error;
      (response);
      dispatch({ type: USER_REGISTER_FAIL, payload: response.data });
    }
  };
};
