import axios from "axios";
const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const MY_ORDERS_REQUEST = "MY_ORDERS_REQUEST";
export const MY_ORDERS_SUCCESS = "MY_ORDERS_SUCCESS";
export const MY_ORDERS_FAIL = "MY_ORDERS_FAIL";

const CLEAR_ERRORS = "CLEAR_ERRORS";

/// Create Order
export const createOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
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

/// My Orders

//// Create Order Action
export const createOrderAction = (order) => {
  console.log("creatOrder", order);
  return async (dispatch, getState) => {
    try {
      console.log("before create Order");
      dispatch({ type: CREATE_ORDER_REQUEST });
      const { data } = await axios.post("/api/v1/order", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("create Reducer before Success", data);

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      console.log("createrOrder Reducer  After Success  data", data);
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAIL, payload: error });
    }
  };
};
export const myOrdersReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDERS_FAIL:
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

// MyOrders  Action
export const myOrderAction = () => {
  return async (dispatch, getState) => {
    try {
      console.log("Before Request  Orders Action");
      dispatch({ type: MY_ORDERS_REQUEST });
      console.log("After Request Orders Action");
      // const { data } = await axios.get("/api/v1/orders/me");
      const res = await axios.get("/api/v1/orders/me");
      console.log("ordersAction", res);
      dispatch({ type: MY_ORDERS_SUCCESS, payload: res.data.orders });
    } catch (error) {
      console.log("orderReducer  Erro", error.message);
      dispatch({ type: MY_ORDERS_FAIL, payload: error.message });
    }
  };
};
