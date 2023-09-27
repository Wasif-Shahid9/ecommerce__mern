require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripe = require("stripe")(
  "sk_test_51NpOzOH6WdU4QKd5bfl0IDMr5eq8yxmSkmOHN5UuXO67JgtXDqpA84nYv4jOdYjOJyMpUni6Tx51gIN5OMibbuko00plCU2ysw"
);

// exports.processPayment = async (req, res) => {
//   try {
//     const { items } = req.body;
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       //   amount: calculateOrderAmount(items),
//       amount: req.body.amount,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

exports.processPayment = async (req, res, next) => {
  console.log(req.body.amount);
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
    });

    console.log("myPayment", myPayment);
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    console.log(error);
  }
};

/// Send Api key to frontend

exports.sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error ${error}`,
    });
  }
};
