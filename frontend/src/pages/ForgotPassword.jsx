import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAction } from "../redux/reducersFun/userReducer/userForgotPassReducer";
const ForgotPassword = () => {
  const { error, message, loading } = useSelector(
    (state) => state.forgotPasswordReducer
  );
  ("forgot", message);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email));
  };
  useEffect(() => {
    if (message) {
      ("forgotpass", message);
      navigate("/profile");
    }
    if (error) {
      ("forgot Password Error", error);
    }
  }, [dispatch, message, error]);
  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <form className="px-6 py-8" onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center font-semibold mb-6  py-3 ">
                  Forgot Password
                </h1>
                <div className="mb-4">
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;

{
  /* <div className="form-box">
            <form className="form" onSubmit={handleSubmit}>
              <span className="title">Forgot Password</span>
              <div className="form-container">
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div> */
}
