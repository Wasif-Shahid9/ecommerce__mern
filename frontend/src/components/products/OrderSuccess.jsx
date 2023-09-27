import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="d-flex text-center bg-black text-white mt-5 p-4 ">
      <p className="text-3xl">Your Order has been Places</p>
      <Link to="/orders" className="text-2xl">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
