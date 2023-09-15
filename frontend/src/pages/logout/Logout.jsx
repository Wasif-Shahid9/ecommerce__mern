import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActionLogout } from "../../redux/reducersFun/userReducer/userLogoutReduer";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the logout action and wait for it to complete
    dispatch(userActionLogout());
    navigate('/login')
  }, []);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
