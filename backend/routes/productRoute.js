const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  // searchProducts,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authentication");

const router = express.Router();
/// IsAuthenticated is me to sirf yh check kiya yh cookie ha or agr cookie ha to user login ha to usy in routes ki access mil gy gi
/// Laikin Ab koi bhi ay or products delete kr dy yh create kry yh to sirf ADMIN kry ga is ky liye Admin

router.route("/getproducts").get(getAllProducts);
// router.route("/search/:keyword").get(searchProducts);
router.route("/createproducts").post(isAuthenticatedUser, createProduct);
router.route("/updateproduct/:id").put(isAuthenticatedUser, updateProduct);
router.route("/deleteproduct/:id").delete(isAuthenticatedUser, deleteProduct);
router.route("/getproductdetail/:id").get(getProductDetail);

module.exports = router;
