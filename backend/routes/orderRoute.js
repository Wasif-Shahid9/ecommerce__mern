const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getMyOrders,
  getAllOrdersByAdmin,
  updateOrderStatusByAdmin,
  deleteProductByAdmin,
} = require("../controllers/orderController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authentication");

router.route("/order").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router
  .route("/orders/admin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrdersByAdmin);
router
  .route("/orders/admin/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatusByAdmin);
router
  .route("/orders/admin/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductByAdmin);
module.exports = router;
