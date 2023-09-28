import axios from "axios";

const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";

const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
const UPDATE_PASSWORD_RESET = "UPDATE_PASSWORD_RESET";
const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";

const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";

const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";
const CLEAR_ERRORS = "CLEAR_ERRORS";

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isUpdated: false,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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

// Action Creator of User Profile
// export const updateProfileAction = (userData) => {
//   ("userDataAction", userData);
//   return async (dispatch, getState) => {
//     try {
//       dispatch({ type: UPDATE_PROFILE_REQUEST });

//       const { data } = await axios.put(
//         "http://localhost:4000/api/v1/updateUserNameAndEmail",
//         userData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       ("updateProdfiledata", data);

//       dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_PROFILE_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
// };

export const updateProfileAction = (userData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const res = await axios.put(
        // "http://localhost:4000/api/v1/updateUserNameAndEmail",
        "api/v1/updateUserNameAndEmail",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ("res: ", res);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        // payload: error.response.data.message,
        payload: error,
      });
    }
  };
};

export const updatePasswordAction = (userData) => {
  ("passUserData", userData);
  return async (dispatch, getState) => {
    try {
      ("Before Request");
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      ("After Request");

      const res = await axios.put("api/v1/updateUserPassword", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: res.data.success });
    } catch (error) {
      // (error.data.message);
      ("error", error);
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        // payload: error,
        payload: error.response.data.message,
      });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
