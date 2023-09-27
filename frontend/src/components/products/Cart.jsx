import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  addToCartAction,
  removeCartItemPayload,
} from "../../redux/reducersFun/cartReducer/cartReducer";
const Cart = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { cartItems } = useSelector((state) => state.cartReducer);

  const incQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCartAction(id, newQty));
  };

  const decQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCartAction(id, newQty));
  };
  const handleRemoveCartItem = (id) => {
    dispatch(removeCartItemPayload(id));
  };

  return (
    <>
      {/* {cartItems.length < 1 ? (
        <div>
          <p> No Items In the Cart</p>
          <Link to="/allproducts">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div>
            <p>Product</p>
            <p>Quantity </p>
            <p>Subtotal</p>
          </div>
          {cartItems &&
            cartItems.map((item) => {
              return (
                <>
                  <div>
                    <h1> Name: {item.name} </h1>
                    <h1> Price: {item.price} </h1>
                    <button onClick={() => handleRemoveCartItem(item.product)}>
                      Remove
                    </button>
                    <button
                      className="p-3 bg-slate-900 text-white "
                      onClick={() => decQuantity(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <button
                      className="p-3 bg-slate-900 text-white "
                      onClick={() =>
                        incQuantity(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                    <h1> {item.quantity}</h1>
                  </div>
                  <h4> Subtotal: {` $ ${item.price * item.quantity}`} </h4>
                  <p>
                    {" "}
                    Total:{" "}
                    {`$${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}`}
                  </p>
                  <Link to="/shipping">CheckOut</Link>
                </>
              );
            })}
        </>
      )} */}
      <div className="container mx-auto my-8">
        {cartItems.length < 1 ? (
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">No Items In the Cart</p>
            <Link
              to="/allproducts"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-4 text-center mb-4">
              <p className="font-semibold">Product</p>
              <p className="font-semibold">Quantity</p>
              <p className="font-semibold">Subtotal</p>
              <p className="font-semibold">Actions</p>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="grid grid-cols-4 gap-4 border-b border-gray-300 py-4"
              >
                <div className="col-span-1">
                  <h1 className="text-lg font-semibold">{item.name}</h1>
                  <p className="text-gray-500">Price: ${item.price}</p>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => decQuantity(item.product, item.quantity)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      incQuantity(item.product, item.quantity, item.stock)
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
                <div className="col-span-1">
                  <h4 className="text-lg font-semibold">
                    Subtotal: ${item.price * item.quantity}
                  </h4>
                </div>
                <div className="col-span-1 flex items-center justify-end space-x-4">
                  <button
                    onClick={() => handleRemoveCartItem(item.product)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-8 text-right">
              <p className="text-lg font-semibold">
                Total: $
                {cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </p>
              <Link
                to="/shipping"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Check Out
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
