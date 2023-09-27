import axios from "axios";
export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

const CLEAR_ERRORS = "CLEAR_ERRORS";

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
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

export const getOrderDetailsAction = (id) => {
  console.log("orderDetaiID", id);
  return async (dispatch, getState) => {
    try {
      // console.log("Before Request");
      dispatch({ type: ORDER_DETAILS_REQUEST });
      // console.log("After  Request");
      const { data } = await axios.get(`/api/v1/order/${id}`);
      console.log("orderDetialAction", data.order);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
    }
  };
};
