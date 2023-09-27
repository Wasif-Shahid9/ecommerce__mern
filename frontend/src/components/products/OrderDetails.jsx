import Recct, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderDetailsAction } from "../../redux/reducersFun/orderReducer/orderDetail";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("paramsOrderDetail.........", id);
  const { loading, error, order } = useSelector(
    (state) => state.orderDetailsReducer
  );
  console.log("OrderDetail Order..", order);
  useEffect(() => {
    if (error) {
      console.log("OrderDetailError", error);
    }
    dispatch(getOrderDetailsAction(id));
  }, [dispatch, id, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <p component="h1">Order #{order && order._id}</p>
              <p>Shipping Info</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <p>Payment</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <p>Order Status</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <p>Order Items:</p>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
          </div> */}
          <div className="orderDetailsPage bg-gray-100 p-4 md:p-8">
            <div className="orderDetailsContainer bg-white p-4 rounded-md shadow-md">
              <p className="md:text-2xl  font-bold">
                Order #{order && order._id}
              </p>
              <p className="text-lg font-semibold">Shipping Info</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p className="font-semibold">Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <p className="text-lg font-semibold">Payment</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <p className="text-lg font-semibold">Order Status</p>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems bg-white p-4 mt-4 rounded-md shadow-md">
              <p className="text-lg font-semibold">Order Items:</p>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center space-x-4 mt-2"
                    >
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-16 h-16"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
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
        </>
      )}
    </>
  );
};

export default OrderDetails;
