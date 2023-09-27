import axios from "axios";
const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_REQUEST";
const CREATE_PRODUCT_FAIL = "CREATE_PRODUCT_REQUEST";
export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // case NEW_PRODUCT_RESET:
    //   return {
    //     ...state,
    //     success: false,
    //   };
    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };
    default:
      return state;
  }
};

export const createProductAction = (productData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_PRODUCT_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `/api/v1/createproducts`,
        productData,
        config
      );

      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: error,
      });
    }
  };
};
