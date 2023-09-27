import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { adminProductAction } from "../../redux/reducersFun/adminProducts/adminProductsReducer";
import Sidebar from "./Dashboard";

import {
  deleteProductAction,
  DELETE_PRODUCT_RESET,
} from "../../redux/reducersFun/adminProducts/adminDeleteProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminAllProducts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, error } = useSelector(
    (state) => state.adminProductsReducer
  );

  useEffect(() => {
    if (error) {
      console.log("Admin Products Error", error);
    }
    dispatch(adminProductAction());
  }, [dispatch, error]);

  /// Delete Product
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProductReducer
  );
  console.log("isDeletes", isDeleted);
  useEffect(() => {
    if (deleteError) {
      console.log("deleteproducterror", deleteError);
    }
    if (isDeleted) {
      console.log("Product isDeleted");
      // Navigate first to /admin/dashboard
      navigate("/admin/dashboard");

      // Dispatch an action to refresh the list of products immediately
      dispatch(adminProductAction());

      // Reset the deleteProductReducer state
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(deleteProductAction());
  }, [error, navigate, dispatch, isDeleted, deleteError]);

  const handleDelete = (id) => {
    dispatch(deleteProductAction(id));
  };
  const handleEdit = () => {
    console.log("Edit Item");
  };
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "description",
      headerName: "Description",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "delete",
      flex: 0.3,
      headerName: "Delete",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button onClick={() => handleDelete(params?.id, "id")}>
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
    {
      field: "edit",
      flex: 0.3,
      headerName: "Edit",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/admin/update/${params.id}`}>
            <EditIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
        description: item.description,
        // delete: <button>Delete Item</button>,
      });
    });

  // const rows = [
  //   products &&
  //     products.map((item) => {
  //       return (
  //         <div>
  //           id:{item._id}, stock: {item.stock}, price: {item.price}, name:
  //           {item.name}
  //           {item.name},
  //         </div>
  //       );
  //     }),
  // ];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productListTable"
        autoHeight
      />
    </div>
  );
};

export default AdminAllProducts;
