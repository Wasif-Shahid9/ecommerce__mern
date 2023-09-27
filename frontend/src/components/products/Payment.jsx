import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createOrderAction } from "../../redux/reducersFun/orderReducer/orderReducer";

// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { error } = useSelector((state) => state.createOrderReducer);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  // jb order create kiya tha tb hm ne yh data localstorage me save bhi kiya tha ab whi se get kt liya dobara request ni krni pari
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  console.log("Payment Order", order);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Click On payment Start");

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${"pk_test_51NpOzOH6WdU4QKd57IysQhbQm490B6jM4QAQAgYQp3dX0b4z1a7NqcRBv2I6Ja0dDRJs9xVOW0f096m9d8mW1mrB00Y9bDEHJe"}`,
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      console.log("paymentData..", data);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        console.log("paymentErrro...", error);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrderAction(order));

          navigate("/ordersuccess");
          console.log("Click On payment After sucess");
        } else {
          console.log("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log("payment error", error);
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, []);

  return (
    // <div className="paymentContainer">
    //   <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
    //     <p>Card Info</p>
    //     <div>
    //       {/* <CreditCardIcon /> */}
    //       <CardNumberElement className="paymentInput" />
    //     </div>
    //     <div>
    //       {/* <EventIcon /> */}
    //       <CardExpiryElement className="paymentInput" />
    //     </div>
    //     <div>
    //       {/* <VpnKeyIcon /> */}
    //       <CardCvcElement className="paymentInput" />
    //     </div>

    //     <input
    //       type="submit"
    //       value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
    //       ref={payBtn}
    //       className="paymentFormBtn cursor-pointer bg-black text-white p-3"
    //     />
    //   </form>
    // </div>
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <form className="px-6 py-4" onSubmit={(e) => submitHandler(e)}>
          <p className="text-xl font-semibold mb-4">Card Info</p>

          <div className="mb-4">
            {/* <CreditCardIcon /> */}
            <CardNumberElement className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-4">
            {/* <EventIcon /> */}
            <CardExpiryElement className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>

          <div className="mb-4">
            {/* <VpnKeyIcon /> */}
            <CardCvcElement className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>

          <div className="text-center">
            <input
              type="submit"
              value={`Pay - $${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className={`w-full px-6 py-2 rounded-lg bg-black text-white font-semibold cursor-pointer ${
                orderInfo
                  ? "hover:bg-gray-800"
                  : "cursor-not-allowed bg-gray-400"
              }`}
              disabled={!orderInfo}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;

// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// export default function Payment() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       " pk_test_51NpOzOH6WdU4QKd57IysQhbQm490B6jM4QAQAgYQp3dX0b4z1a7NqcRBv2I6Ja0dDRJs9xVOW0f096m9d8mW1mrB00Y9bDEHJe"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         // return_url: "http://localhost:3000",
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// }
