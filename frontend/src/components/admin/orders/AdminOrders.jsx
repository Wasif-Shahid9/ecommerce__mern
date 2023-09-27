import React, { Fragment, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { adminDeleteOrderAction } from "../../../redux/reducersFun/adminOrders/adminOrder";
import {
  adminAllOrdersAction,
  DELETE_ORDER_RESET,
  CLEAR_ERRORS,
} from "../../../redux/reducersFun/adminOrders/adminAllOrders";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const alert = useAlert();

  const { error, orders } = useSelector((state) => state.adminAllOrders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminOrder
  );

  const deleteOrderHandler = (id) => {
    dispatch(adminDeleteOrderAction(id));
  };

  useEffect(() => {
    if (error) {
      //   alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      //   alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      console.log("Order Delted", isDeleted);
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(adminAllOrdersAction());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.id === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.id}`}>
              {" "}
              <EditIcon />{" "}
            </Link>

            <button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      {/* <MetaData title={`ALL ORDERS - Admin`} /> */}

      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">Admin All ORDERS</h1>

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

export default AdminOrders;
