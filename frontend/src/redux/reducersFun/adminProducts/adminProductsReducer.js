import axios from "axios";
const ADMIN_PRODUCT_REQUEST = "ADMIN_PRODUCT_REQUEST";
const ADMIN_PRODUCT_SUCCESS = "ADMIN_PRODUCT_SUCCESS";
const ADMIN_PRODUCT_FAIL = "ADMIN_PRODUCT_FAIL";
export const adminProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export function adminProductAction() {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST });
      const products = await axios.get("/api/v1/admin/products");

      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: products.data.products,
      });
    } catch (error) {
      dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message });
    }
  };
}
