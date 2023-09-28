import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActionLogout } from "../../redux/reducersFun/userReducer/userLogoutReduer";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  loadUser,
  logout,
} from "../../redux/reducersFun/userReducer/userReducer";
import Search from "../../pages/Search";
import { ToastContainer, toast } from "react-toastify";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.userReducer);
  // const { isAuthenticated } = user;
  const { isAuthenticated, user } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.success(`Logout Successfully`);
    navigate("/login");
  };

  /// Search

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/allproducts/${keyword}`);
    }
    if (!keyword) {
      ("products notfound");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <Link to="/" className="flex-1">
              <div className="flex-1 px-2 mx-2 sm:10px">WSEcommerce</div>
            </Link>

            <div className="mx-auto my-2">
              <form
                action=""
                className="flex items-center"
                onSubmit={handleSearch}
              >
                <div className="rounded-lg flex items-center ">
                  <input
                    type="search"
                    placeholder="Search Products"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="search p-3 rounded-l-lg outline-none w-[100%] "
                  />
                </div>
              </form>
            </div>

            {/* <div className="rounded-lg flex items-center ">
              <input
                type="search"
                placeholder="Search Products"
                onChange={(e) => setKeyword(e.target.value)}
                className=" search p-3 rounded-l-lg outline-none   "
              />
            </div> */}

            {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-none relative z-[11] mr-[10px]  ">
              {isAuthenticated ? (
                <>
                  <div className="dropdown dropdown-end ">
                    <Link to="/cart" className="relative mr-5">
                      <ShoppingCartIcon />
                      <p className="absolute top-[-92%] right-[0] ">
                        {cartItems.length}{" "}
                      </p>
                    </Link>
                    <label tabIndex={0} className="btn m-1">
                      {user ? user.name : ""}
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <ul className="menu menu-horizontal">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/* Page content here */}
        </div>
        <div className="drawer-side  z-[3]">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <div className="mx-auto my-2">
              <form
                action=""
                className="flex items-center"
                onSubmit={handleSearch}
              >
                <div className="rounded-lg flex items-center ">
                  <input
                    type="search"
                    placeholder="Search Products"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="search p-3 rounded-l-lg outline-none w-[100%] "
                  />
                </div>
              </form>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
