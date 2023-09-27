import axios from "axios";
const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_RESET = "DELETE_PRODUCT_RESET";
const DELETE_PRODUCT_FAIL = "DELETE_PRODUCT_FAIL";

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };
    default:
      return state;
  }
};

export const deleteProductAction = (id) => {
  console.log("delte action id.............", id);
  return async (dispatch) => {
    try {
      console.log("Before Request...");
      dispatch({ type: DELETE_PRODUCT_REQUEST });

      const { data } = await axios.delete(`/api/v1/admin/deleteproduct/${id}`);
      console.log("delete prodyuct data............", data);
      console.log("After Request...");

      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(" Delete  error  ", error);
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };
};
