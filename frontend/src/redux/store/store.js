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
import { userReducerProfile } from "../reducersFun/userReducer/userProfileReducer";
import { userReducerLogout } from "../reducersFun/userReducer/userLogoutReduer";

const allReducers = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  search: searchReducer,
  userReducerRegister: userReducerRegister,
  userReducerLogin: userReducerLogin,
  userReducerProfile: userReducerProfile,
  userReducerLogout: userReducerLogout,
});
// const store = createStore(
//   allReducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk)),
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
