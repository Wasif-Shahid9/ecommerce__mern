import axios from "axios";

const PRODUCTDETAIL_REQ = "PRODUCTDETAIL_REQ";
const PRODUCTDETAIL_SUCCESS = "PRODUCTDETAIL_SUCCESS";
const PRODUCTDETAIL_FAIL = "PRODUCTDETAIL_FAIL";
// Reducer Function
// const initialState = {
//   product: {},
// };


/// yha initial value object rakhi ha q ky single product to object hi ha
export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTDETAIL_REQ:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTDETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case PRODUCTDETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
//Action Creator
export function productDetailAction(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/getproductdetail/${id}`
      );

      dispatch({ type: PRODUCTDETAIL_REQ });
      dispatch({ type: PRODUCTDETAIL_SUCCESS, payload: data.product });
    } catch (error) {
      dispatch({ type: PRODUCTDETAIL_FAIL, payload: error });
    }
  };
}

// action ko dispatch me call krna hota ha js me call aik or return is liye likha ky agr wo argument me koi value lyta to phir dispatch or getState us ky sath ni likh skte
