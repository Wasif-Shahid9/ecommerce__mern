import { Select } from "@mui/base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminUpdateOrderAction } from "../../../redux/reducersFun/adminOrders/adminOrder";

const AdminUpdateOrder = () => {
  //   const [status, setStatus] = useState("");
  const params = useParams(); // Assuming you get the product ID from the URL params
  const dispatch = useDispatch();
  const options = [
    {
      label: "Shipped",
      value: "shipped",
    },
    {
      label: "Delievered",
      value: "delievered",
    },
  ];

  const [productData, setProductData] = useState({
    status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(adminUpdateOrderAction(params.id, productData));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Update Product Status</h1>
      {/* Loading and success/error messages can be added here */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Update Status:</label>
          <select onChange={(e) => handleInputChange(e.target.value)}>
            {options.map((option, i) => (
              <option value={option.value} name={option.label} key={i}>
                {option.label}{" "}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Order Status
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateOrder;
