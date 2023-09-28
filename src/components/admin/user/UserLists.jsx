import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  adminGetAllUsersAction,
  clearErrors,
} from "../../../redux/reducersFun/adminUsers/adminAllUsers";
import { deleteUser } from "../../../redux/reducersFun/adminUsers/adminUser";
// import { adminDeleteUserAction } from "../../../redux/reducersFun/adminUsers/adminUser";
const UsersList = () => {
  const dispatch = useDispatch();

  const { error, users } = useSelector((state) => state.adminAllUsersReducer);
  ("userlist", users);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.adminUser);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      ("uselistError", error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      //   alert.error(deleteError);
      ("deleteError", deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      //   alert.success(message);
      (message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(adminGetAllUsersAction());
  }, [dispatch, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.id === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.id}`}>
              {/* <EditIcon /> */}
              Edit
            </Link>

            <button onClick={() => deleteUserHandler(params.id)}>Delete</button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      {/* <MetaData title={`ALL USERS - Admin`} /> */}

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UsersList;
