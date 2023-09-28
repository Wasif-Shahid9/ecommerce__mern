import axios from "axios";
const NEW_REVIEW_REQUEST = "NEW_REVIEW_REQUEST";
const NEW_REVIEW_SUCCESS = "NEW_REVIEW_SUCCESS";
export const NEW_REVIEW_RESET = "NEW_REVIEW_RESET";
const NEW_REVIEW_FAIL = "NEW_REVIEW_FAIL";
const CLEAR_ERRORS = "CLEAR_ERRORS";
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
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

export const newReviewAction = (reviewData) => {
  ("review Reducer Start...");
  return async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      ("review Reducer Request......");

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      ("reviewReducer", data);
      

      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      ("New Review Error..", error);
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.message,
      });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
