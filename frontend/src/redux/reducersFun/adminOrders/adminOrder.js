import axios from "axios";
const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET";
const UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL";

const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
const DELETE_ORDER_RESET = "DELETE_ORDER_RESET";
const DELETE_ORDER_FAIL = "DELETE_ORDER_FAIL";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const adminOrder = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const adminUpdateOrderAction = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.message,
    });
  }
};

// Delete Order
export const adminDeleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.log("adminOrderActionError", error);
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.message,
    });
  }
};
