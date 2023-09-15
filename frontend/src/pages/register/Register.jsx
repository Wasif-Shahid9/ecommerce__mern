import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userActionRegister,
  userReducerRegister,
} from "../../redux/reducersFun/userReducer/userRegisterReducer";

const Register = () => {
  const { error, loading } = useSelector((state) => state.userReducerRegister);
  console.log("error", error);
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
    console.log("userData", userData);
    dispatch(userActionRegister(userData));
  };
  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default Register;
