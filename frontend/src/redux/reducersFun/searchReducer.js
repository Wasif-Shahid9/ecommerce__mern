import axios from "axios";
/// Constnt
const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
const initialState = {
  products: [],
};
/// Reducer Functions
export const searchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export function searchAction(keyword = "") {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/search?keyword=${keyword}`
      );

      dispatch({ type: SEARCH_PRODUCTS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_PRODUCTS, payload: error });
    }
  };
}
