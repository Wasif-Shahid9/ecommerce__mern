import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.userReducer
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          <Link
            to="/updateprofile"
            className="text-white bg-blue-500 py-2 px-4 rounded-md mb-4 block text-center"
          >
            Edit Profile
          </Link>
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Name</h1>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Email</h1>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Password</h1>
            <p className="text-gray-800">********</p>
            <Link
              to="/updatepassword"
              className="text-blue-500 hover:underline"
            >
              Update Password
            </Link>
          </div>
          <div>
            <Link to="/orders" className="text-blue-500 hover:underline">
              My Orders
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
