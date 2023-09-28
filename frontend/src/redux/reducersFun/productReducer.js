import axios from "axios";
/// Constnt
const PRODUCTAPI_REQ = "PRODUCTAPI_REQ ";
const PRODUCTAPI_SUCCESS = "PRODUCTAPI_SUCCESS";
const PRODUCTAPI_FAIL = "PRODUCTAPI_FAIL";
const CLEAR_ERRORS = "CLEAR_ERRORS";

const initialState = {
  loading: false,
  products: [],
  error: null,
  searchKeyword: "",
};
/// Reducer Functions

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTAPI_REQ:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTAPI_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        resultPerPage: action.payload.resultPerPage,
        error: null,
        productsCount: action.payload.productsCount,
      };
    case PRODUCTAPI_FAIL:
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

export function getproductAction(keyword = "", currentPage) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCTAPI_REQ });
      const { data } = await axios.get(
        `/api/v1/getproducts?keyword=${keyword}&page=${currentPage}`
      );
      ("productAcion...", data.products);

      dispatch({ type: PRODUCTAPI_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({ type: PRODUCTAPI_FAIL, payload: error });
    }
  };
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
