import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { userActionLogin } from "../../redux/reducersFun/userReducer/userLoginReducer";
import { useSelector, useDispatch } from "react-redux";

import { login } from "../../redux/reducersFun/userReducer/userReducer";

const Login = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     email,
  //     password,
  //   };
  //   console.log(userData);
  //   dispatch(userActionLogin(userData));
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    // localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      {/* <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Login Error: {error}</p>
        ) : (
          <div className="form-box" onSubmit={handleSubmit}>
            <form className="form">
              <span className="title">Login</span>
              <div className="form-container">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/password/forgot">ForgotPassword</Link>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div> */}
      <div className="container mx-auto py-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-800">Login Error: {error}</p>
        ) : (
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
              <span className="text-2xl font-semibold mb-6">Login</span>
              <div className="mb-6">
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 mt-2 mb-2"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 mt-2 mb-2"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Link to="/password/forgot" className="text-blue-500">
                  Forgot Password
                </Link>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
