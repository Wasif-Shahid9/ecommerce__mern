import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { userActionLogin } from "../../redux/reducersFun/userReducer/userLoginReducer";
import { useSelector, useDispatch } from "react-redux";
import { userActionProfile } from "../../redux/reducersFun/userReducer/userProfileReducer";

const Login = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.userReducerLogin
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(userActionLogin(userData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
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
      </div>
    </>
  );
};

export default Login;
