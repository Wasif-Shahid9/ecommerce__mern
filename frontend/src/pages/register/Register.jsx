import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/reducersFun/userReducer/userReducer";
import {
  userActionRegister,
  userReducerRegister,
} from "../../redux/reducersFun/userReducer/userRegisterReducer";

const Register = () => {
  const { error, loading } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };
  return (
    <>
      {/* <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="form-box">
            <form className="form" onSubmit={handleSubmit}>
              <span className="title">Signup</span>
              <div className="form-container">
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
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
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </div> */}
      <div className="container mx-auto py-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-800">Error: {error.message}</p>
        ) : (
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
              <span className="text-2xl font-semibold mb-6">Signup</span>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
