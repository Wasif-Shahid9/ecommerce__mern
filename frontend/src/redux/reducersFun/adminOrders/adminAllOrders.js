import axios from "axios";
const ALL_ORDERS_REQUEST = "ALL_ORDERS_REQUEST";
const ALL_ORDERS_SUCCESS = "ALL_ORDERS_SUCCESS";
const ALL_ORDERS_FAIL = "ALL_ORDERS_FAIL";

const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET";
const UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL";

const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_RESET = "DELETE_ORDER_RESET";
const DELETE_ORDER_FAIL = "DELETE_ORDER_FAIL";

const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const adminAllOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ALL_ORDERS_FAIL:
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

export const adminAllOrdersAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });

      const { data } = await axios.get("/api/v1/admin/orders");

      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.message,
      });
    }
  };
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
