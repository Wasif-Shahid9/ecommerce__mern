// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   address: {
//     street: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     postalCode: {
//       type: String,
//       required: true,
//     },
//     province: {
//       type: String,
//       required: true,
//     },
//     country: {
//       type: String,
//       required: true,
//       deafult: "Pakistan",
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//   },

//   /// Array is liye use ki ha q ky aik product ky  different orders bhi ho skte hn
//   orderItems: [
//     {
//       name: { type: String, required: true },
//       price: { type: String, required: true },
//       quantity: { type: String, required: true },
//       image: { type: String, required: true },
//       product: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//     },
//   ],
//   /// ref basically kie dosre database ky sath reference create krne ky liye use ho ga matlab ma yha reference dy rha hoon ky ky user ka schema ha

//   paymentInfo: {
//     id: { type: String, required: true },
//     status: { type: String, required: true },
//   },
//   paidDate: {
//     type: Date,
//     required: true,
//   },
//   taxPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },

//   itemsPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   shippingPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   orderStatus: {
//     type: String,
//     // required: true,
//     enum: ["Pending", "Delivered", "Returned", "Cancelled"],
//     default: "Pending",
//   },
//   deliverdDate: {
//     type: Date,
//   },
//   createDate: {
//     type: Date,
//     defult: Date.now(),
//   },
// });
// const OrderModel = mongoose.model("Order", orderSchema);

// module.exports = OrderModel;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
      default: "Pakistan",
    },
    phoneNumber: {
      type: String,
    },
  },
  orderItems: [
    {
      name: { type: String },
      price: { type: String },
      quantity: { type: String },
      image: { type: String },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidDate: {
    type: Date,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  itemsPrice: {
    type: Number,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Delivered", "Returned", "Cancelled"],
    default: "Pending",
  },
  deliverdDate: {
    type: Date,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
