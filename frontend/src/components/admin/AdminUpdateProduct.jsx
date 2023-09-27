import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProductAction } from "../../redux/reducersFun/adminProducts/adminUpdateProduct";

const AdminUpdateProduct = () => {
  const params = useParams(); // Assuming you get the product ID from the URL params
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
  });
  // const { loading, isUpdated, error } = useSelector(
  //   (state) => state.updateProductReducer
  // );

  // useEffect(() => {
  //   // Fetch the product data by ID and set it to the state
  //   // You can make an API call to fetch the current product data here
  //   // Example: axios.get(`/api/v1/products/${id}`)
  //   // Then set the product data to the state using setProductData
  // }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to update the product
    dispatch(updateProductAction(params.id, productData));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>
      {/* Loading and success/error messages can be added here */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
            className="border rounded-md p-2 h-32"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleInputChange}
            required
            className="border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateProduct;
