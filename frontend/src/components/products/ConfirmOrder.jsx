import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./confirmOrder.css";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);

  const { user } = useSelector((state) => state.userReducer);

  const subtotal = cartItems.reduce(
    (acc, currentItem) => acc + currentItem.quantity * currentItem.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const totalPrice = subtotal + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      shippingCharges,
      subtotal,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
    // window.location.href = "https://buy.stripe.com/test_5kA7w16sOdmhgy4fYY";
  };
  return (
    <>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <p>Shipping Info</p>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <p>Your Cart Items:</p>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <p>Order Summery</p>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
            {/* <script async src="https://js.stripe.com/v3/buy-button.js"></script> */}

            {/* <stripe-buy-button
              buy-button-id="buy_btn_1NsiRvH6WdU4QKd5qWh58l8f"
              publishable-key="pk_test_51NpOzOH6WdU4QKd57IysQhbQm490B6jM4QAQAgYQp3dX0b4z1a7NqcRBv2I6Ja0dDRJs9xVOW0f096m9d8mW1mrB00Y9bDEHJe"
            ></stripe-buy-button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
