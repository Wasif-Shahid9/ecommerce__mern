const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/produtModel");

exports.createOrder = async (req, res, next) => {
  (req.body);
  try {
    const {
      address,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await OrderModel.create({
      address,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      // ...req.body,
      paidDate: Date.now(),
      /// yh hm ne model schema me diya tha ky kis user ne create kiya ha us ki id
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Shipping Details Added ",
      order,
    });
  } catch (err) {
    ("orderError", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
      error: err,
    });
  }
};

// Get Single Orders
exports.getSingleOrder = async (req, res, next) => {
  ("req.parmas.id", req.params.id);
  try {
    // const order = await OrderModel.findById(req.params.id);

    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );

    ("Single Order", order);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `User is not found with this id: ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

// login User Orders
exports.getMyOrders = async (req, res, next) => {
  ("order user id", req.user._id);
  try {
    // db me wo orders find krne hn jis  me jo user ki id ha db me wo login user ki id se match kry
    const orders = await OrderModel.find({ user: req.user._id });
    ("userID....", orders);
    // ("orders", orders);

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/// Only admin see all orders
exports.getAllOrdersByAdmin = async (req, res, next) => {
  try {
    const orders = await OrderModel.find();

    const totalOrders = orders.length;

    const totalProductPrice = orders.reduce((accu, currentValue) => {
      return accu + currentValue.totalPrice;
    }, 0);
    (totalProductPrice);

    return res.status(200).json({
      success: true,
      orders,
      totalOrders,
      totalProductPrice,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.updateOrderStatusByAdmin = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `User is not found with this id: ${req.params.id}`,
      });
    }
    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order is already delivered",
      });
    }
    order.orderItems.map(async (order) => {
      await updateOrderStock(order.product, order.quantity);
    });
    const { status } = req.body;
    order.orderStatus = status;

    if (order.orderStatus === "Delivered") {
      order.deliverdDate = Date.now();
    }

    // Update the order status to "Delivered"
    await order.save({ validateBeforeSave: true });

    res.status(200).json({
      success: true,
      message:
        "Order status updated to Delivered, and stock quantities updated",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

updateOrderStock = async (productId, quantity) => {
  (productId);
  const product = await ProductModel.findById(productId);
  (product);
  product.stock = product.stock - quantity;
  await product.save();
};
/// Delete Product
exports.deleteProductByAdmin = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      res.status(404).json({
        success: false,
        message: `User is not found with this id: ${req.params.id}`,
      });
    }
    await order.deleteOne();
    res.status(200).json({
      success: true,
      message: "Order Delete Succesfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

///////////////// START Product Inventry
// router.put("/api/orders/:id/status", async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const newStatus = req.body.status; // Assuming the new status is sent in the request body

//     // Find the order by its ID
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: `Order not found with ID: ${orderId}`,
//       });
//     }

//     // Update the order status
//     order.orderStatus = newStatus;

//     // Optionally, update other order properties if needed
//     // order.deliveredDate = new Date(); // For example, if marking as Delivered

//     // Save the updated order
//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       order,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// // Get Pending Orders API:
// router.get("/api/orders/pending", async (req, res) => {
//   try {
//     const pendingOrders = await Order.find({ orderStatus: "Pending" });

//     res.status(200).json({
//       success: true,
//       message: "Pending orders retrieved successfully",
//       orders: pendingOrders,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// // Get Delivered Orders API:

// router.get("/api/orders/delivered", async (req, res) => {
//   try {
//     const deliveredOrders = await Order.find({ orderStatus: "Delivered" });

//     res.status(200).json({
//       success: true,
//       message: "Delivered orders retrieved successfully",
//       orders: deliveredOrders,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });

// // . Get Returned Orders API:
// router.get("/api/orders/returned", async (req, res) => {
//   try {
//     const returnedOrders = await Order.find({ orderStatus: "Returned" });

//     res.status(200).json({
//       success: true,
//       message: "Returned orders retrieved successfully",
//       orders: returnedOrders,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });
