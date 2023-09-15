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
import { useSelector } from "react-redux";
import UserOption from "./pages/userOption";
import store from "./redux/store/store";
import { userActionProfile } from "./redux/reducersFun/userReducer/userProfileReducer";
import Logout from "./pages/logout/Logout";

function App() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.userReducerLogin
  );

  const [showUser, setShowUser] = useState(true);

  // useEffect(() => {
  //   const appdata = window.localStorage.getItem("User");
  //   console.log("get user", appdata);
  // }, []);
  // useEffect(() => {
  //   console.log("set user", user);
  //   window.localStorage.setItem("User", JSON.stringify(user));
  // }, [user]);

  // useEffect(() => {
  //   const appdata = window.localStorage.getItem("User");
  //   console.log("get user", appdata);
  //   if (Object.keys(appdata).length === 0) {
  //     console.log("set user", user);
  //     window.localStorage.setItem("User", JSON.stringify(user));
  //   }
  // }, [user]);

  // useEffect(() => {
  //   store.dispatch(userActionProfile());
  // }, []);
  return (
    <>
      <Router>
        {isAuthenticated && <UserOption user={user} />}

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/allproducts/:keyword" element={<AllProducts />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated && (
            <Route path="logout" element={<Logout />}></Route>
          )}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
