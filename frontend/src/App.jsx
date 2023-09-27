import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import AllProducts from "./components/products/AllProducts";
import ProductDetail from "./components/products/ProductDetail";
import Search from "./pages/Search";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useSelector, useDispatch } from "react-redux";
import UserOption from "./pages/userOption";
import store from "./redux/store/store";
import { loadUser } from "./redux/reducersFun/userReducer/userReducer";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./components/products/Cart";
import Shipping from "./components/products/Shipping";
import ConfirmOrder from "./components/products/ConfirmOrder";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/products/Payment";
import MyOrders from "./components/products/MyOrders";
import OrderDetails from "./components/products/OrderDetails";
import OrderSuccess from "./components/products/OrderSuccess";
import Dashboard from "./components/admin/Dashboard";
import AdminAllProducts from "./components/admin/AdminAllProducts";
import AdminUpdateProduct from "./components/admin/AdminUpdateProduct";
import AdminCreateProduct from "./components/admin/AdminCreateProduct";
import AdminOrders from "./components/admin/orders/AdminOrders";
import AdminUpdateOrder from "./components/admin/orders/AdminUpdateOrder";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.userReducer);
  // const [clientSecret, setClientSecret] = useState("");
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      // console.log("stripe key frontend...", data);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log(error);
    }
  }

  // useSelctor me hmeaha store ka name dena j ky dispatch me action ka name

  // useEffect(() => {
  //   const appdata = window.localStorage.getItem("User");
  //   console.log("get user", appdata);
  //   if (user > 0 && Object.keys(appdata).length === 0) {
  //     window.localStorage.setItem("User", JSON.stringify(user));
  //     // dispatch({ type: LOGIN_SUCCESS, payload: user });
  //   }
  // }, [user]);
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(storedUser) });
  //   }
  // }, []);

  /// we check if the user is authenticated then store it in Redux USer state
  useEffect(() => {
    if (localStorage.getItem("user")) {
      store.dispatch(loadUser());
    }

    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        {isAuthenticated ? (
          <h1>Authenticated</h1>
        ) : (
          <h1>Error: Not Authenticated</h1>
        )}
        <Header />

        <Routes>
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              }
            />
          )}
          {/* <Route
            path="/payment"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Payment />
              </ProtectedRoute>
            }
          />{" "} */}
          <Route path="/" element={<Home />} />

          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/allproducts/:keyword" element={<AllProducts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateprofile"
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
          {/* 
          <Route
            path="/updatepassword"
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          /> */}
          <Route
            path="/updatepassword"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ordersuccess"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          {/* Single Order Detail */}
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          {/*  Dashboard Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminAllProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminCreateProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/update/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminUpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminUpdateOrder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
