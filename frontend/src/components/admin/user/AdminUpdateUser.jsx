import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  updateUser,
  UPDATE_USER_RESET,
} from "../../../redux/reducersFun/adminUsers/adminUser";
import { adminUserDetailAction } from "../../../redux/reducersFun/adminUsers/adminUserDetails";

import Loader from "../../loader/Loader";

const AdminUpdateUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector(
    (state) => state.adminUserDetailsReducer
  );

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.adminUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(adminUserDetailAction(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      (error);
      dispatch(clearErrors());
    }

    if (updateError) {
      ("UpdateUser", updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success("User Updated Successfully");
      ("User Update Successfully");

      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      {/* <MetaData title="Update User" /> */}
      <div className="dashboard flex flex-col md:flex-row">
        {/* Sidebar */}
        {/* Uncomment the Sidebar component here if you want to include it */}
        {/* <SideBar /> */}

        {/* Content Container */}
        <div className="newProductContainer w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mt-4 md:mt-0">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm p-4 md:p-8 rounded-lg bg-white shadow-md"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Update User
              </h1>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="mb-4">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading || role === ""}
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUpdateUser;
