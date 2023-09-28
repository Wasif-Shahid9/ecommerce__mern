import React, { useState, useEffect } from "react";
import {
  updatePasswordAction,
  clearErrors,
} from "../redux/reducersFun/userReducer/userProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../redux/reducersFun/userReducer/userReducer";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/loader/Loader";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userProfileReducer
  );

  ("errorPasswrodCom", error);
  // ("loading", loading);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    ("userDataUpdatePAssword", userData);
    // if (localStorage.getItem("user")) {
    //   dispatch(updatePasswordAction(userData));
    // }
    dispatch(updatePasswordAction(userData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated]);
  return (
    <div>
      {loading ? (
        <p>
          <Loader />
        </p>
      ) : (
        <div className="container mx-auto py-8">
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <form className="px-6 py-8" onSubmit={handleSubmit}>
              <span className="text-2xl font-semibold mb-6">
                Update Password
              </span>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  value={oldPassword}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  value={newPassword}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  value={confirmPassword}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
