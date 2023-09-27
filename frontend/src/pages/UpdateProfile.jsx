import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAction } from "../redux/reducersFun/userReducer/userProfileReducer";
import { loadUser } from "../redux/reducersFun/userReducer/userReducer";

const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";
const UpdateProfile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfileReducer
  );
  console.log("updateProfile", user.name);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
    };
    dispatch(updateProfileAction(userData));
    console.log("Update Profile");
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (isUpdated) {
      console.log("User  Update Successfuly");
      dispatch(loadUser());
      navigate("/profile");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, navigate, isUpdated]);

  return (
    <>
      <div className="container mx-auto py-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-800">Error: {error.message}</p>
        ) : (
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <form className="px-6 py-4" onSubmit={handleSubmit}>
              <span className="text-2xl font-semibold mb-4">
                Update Profile
              </span>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </div>
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
                  className="w-full px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProfile;
