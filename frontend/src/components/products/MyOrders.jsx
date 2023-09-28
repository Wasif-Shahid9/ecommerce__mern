import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { myOrderAction } from "../../redux/reducersFun/orderReducer/orderReducer";
import Loader from "../loader/Loader";
import DetailsIcon from "@mui/icons-material/Details";
const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.myOrdersReducer
  );
  // ("orders type", Array.isArray(orders));
  (orders);

  const { user } = useSelector((state) => state.userReducer);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
      headerName: "Order Detail",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        ("columnParams", params.id);
        return (
          <Link to={`/order/${params.id}`}>
            {" "}
            <DetailsIcon />{" "}
          </Link>
        );
      },
    },
  ];

  const rows = Array.isArray(orders)
    ? orders.map((order) => ({
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
      }))
    : [];

  useEffect(() => {
    if (error) {
      ("order Useeffect error", error);
    }

    dispatch(myOrderAction());
  }, [dispatch, error]);

  return (
    <Fragment>
      {/* <MetaData title={`${user.name} - Orders`} /> */}

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <p id="myOrdersHeading">{user?.name} Orders</p>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
