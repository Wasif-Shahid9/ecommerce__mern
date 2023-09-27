import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  composeWithDevTools,
  devToolsEnhancer,
} from "redux-devtools-extension";
import {
  getproductAction,
  productReducer,
} from "../reducersFun/productReducer";
import { productDetailReducer } from "../reducersFun/productDetailReducer";
import thunk from "redux-thunk";
import { searchReducer } from "../reducersFun/searchReducer";
import { userReducerRegister } from "../reducersFun/userReducer/userRegisterReducer";
import { userReducerLogin } from "../reducersFun/userReducer/userLoginReducer";
import { userReducerLogout } from "../reducersFun/userReducer/userLogoutReduer";
import { userReducer } from "../reducersFun/userReducer/userReducer";
import { userProfileReducer } from "../reducersFun/userReducer/userProfileReducer";
import { forgotPasswordReducer } from "../reducersFun/userReducer/userForgotPassReducer";
import { cartReducer } from "../reducersFun/cartReducer/cartReducer";
import {
  createOrderReducer,
  myOrdersReducer,
} from "../reducersFun/orderReducer/orderReducer";
import { orderDetailsReducer } from "../reducersFun/orderReducer/orderDetail";
import { adminProductsReducer } from "../reducersFun/adminProducts/adminProductsReducer";
import { deleteProductReducer } from "../reducersFun/adminProducts/adminDeleteProducts";
import { createProductReducer } from "../reducersFun/adminProducts/adminCreateProduct";
import { newReviewReducer } from "../reducersFun/reviewReducer/reviewReducer";
import { adminAllOrders } from "../reducersFun/adminOrders/adminAllOrders";
import { adminOrder } from "../reducersFun/adminOrders/adminOrder";

const allReducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  search: searchReducer,
  // userReducerRegister: userReducerRegister,
  // userReducerLogin: userReducerLogin,
  // userReducerProfile: userReducerProfile,
  // userReducerLogout: userReducerLogout,
  userReducer: userReducer,
  userProfileReducer: userProfileReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  cartReducer: cartReducer,
  createOrderReducer: createOrderReducer,
  myOrdersReducer: myOrdersReducer,
  orderDetailsReducer: orderDetailsReducer,
  createProductReducer: createProductReducer,
  adminProductsReducer: adminProductsReducer,
  deleteProductReducer: deleteProductReducer,
  newReviewReducer: newReviewReducer,
  adminAllOrders: adminAllOrders,
  adminOrder: adminOrder,
});
// const store = createStore(
//   allReducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

let initialState = {
  cartReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const store = createStore(
  allReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
  // window.devToolsExtension && window.devToolsExtension()
);

export default store;
