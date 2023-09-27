import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productDetailAction } from "../../redux/reducersFun/productDetailReducer";
import Rating from "@mui/material/Rating";
import { clearErrors } from "../../redux/reducersFun/productReducer";
import { ToastContainer, toast } from "react-toastify";
import { addToCartAction } from "../../redux/reducersFun/cartReducer/cartReducer";
import SubmitReview from "./SubmitReview";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  /// Yh productDetail me wo name ata ha jo hm store me combinereducer me dyte hn
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  // console.log("ProductDetailRating", Array.isArray(product));
  // console.log("productDetail", product);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      // Dispatch an action to clear the error state
      dispatch(clearErrors());
      console.log("ProductDetilError", error);
    }
    dispatch(productDetailAction(id));
  }, [dispatch, error, id]);

  // user 10 products order krta or stock me 5 hn to condition lga di ky stock hmesha km ho
  const incQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };

  const addToCart = () => {
    dispatch(addToCartAction(id, quantity, product));
  };

  return (
    <>
      <div className="lg:flex lg:items-start lg:justify-between">
        {/* Left Side (Image) */}
        <div className="lg:w-1/2">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-800">Error: {error.message}</p>
          ) : (
            <>
              {product.images && (
                <img
                  className="w-[70%] h-auto mb-4 rounded-lg m-auto mt-[30px]"
                  src="https://plus.unsplash.com/premium_photo-1664910568494-10e40f237b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Product Image"
                />
              )}
            </>
          )}
        </div>

        {/* Right Side (Product Details) */}
        <div className="lg:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg text-gray-800 mb-2">{`$ ${product.price}`}</p>
          <p
            className={`text-xl ${
              product.stock < 1 ? "text-red-600" : "text-green-600"
            } mb-2`}
          >
            {product.stock < 1 ? "Out of Stock" : "In Stock"}
          </p>
          <div className="mb-2">
            <Rating
              name="simple-controlled"
              value={product.rating}
              precision={0.5}
              readOnly={true}
            />
          </div>
          {/* <div> Reviews: {product.reviews.length}</div> */}

          <div className="mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              onClick={decQuantity}
            >
              -
            </button>
            {quantity}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
              onClick={incQuantity}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <button
            disabled={product.stock < 1}
            className={`${
              product.stock <= quantity
                ? "bg-red-800 text-white py-2 px-4 rounded-md cursor-not-allowed"
                : "bg-blue-500 text-white py-2 px-4 rounded-md"
            }`}
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <button>
            <SubmitReview />
          </button>

          <h1 className="text-2xl font-semibold my-2">Reviews</h1>

          {/* {product.reviews && product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 bg-white shadow-lg rounded-lg"
                >
                  <img
                    // src={profilePng}
                    alt="User"
                    className="w-10 h-10 rounded-full mb-2"
                  />
                  <p className="text-gray-800 text-lg font-semibold">
                    {review.name}
                  </p>
                  <Rating name="simple-controlled" value={review.rating} />
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Reviews Yet</p>
          )} */}

          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-4 bg-white shadow-lg rounded-lg"
                >
                  <img
                    // src={profilePng}
                    alt="User"
                    className="w-10 h-10 rounded-full mb-2"
                  />
                  <p className="text-gray-800 text-lg font-semibold">
                    {review.name}
                  </p>
                  <Rating
                    name="simple-controlled"
                    value={review.rating}
                    readOnly="true"
                  />
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Reviews Yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
