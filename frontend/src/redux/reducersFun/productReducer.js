import axios from "axios";
/// Constnt
const PRODUCTAPI_REQ = "PRODUCTAPI_REQ ";
const PRODUCTAPI_SUCCESS = "PRODUCTAPI_SUCCESS";
const PRODUCTAPI_FAIL = "PRODUCTAPI_FAIL";
const ERROR = "ERROR";

const initialState = {
  loading: false,
  products: [],
  error: null,
  searchKeyword: "",
};
/// Reducer Functions
const products = [];
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
        products: action.payload.products,
        resultPerPage: action.payload.resultPerPage,
        error: null,
      };
    case PRODUCTAPI_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
        `http://localhost:4000/api/v1/getproducts?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({ type: PRODUCTAPI_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCTAPI_FAIL, payload: error });
    }
  };
}
