import axios from "axios";
export const ALL_USERS_REQUEST = "ALL_USERS_REQUEST";
export const ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
export const ALL_USERS_FAIL = "ALL_USERS_FAIL";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const adminAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
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

export const adminGetAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);
    ("dataAdminReducer", data.user);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
