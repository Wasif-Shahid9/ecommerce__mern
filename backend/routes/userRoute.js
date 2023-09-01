const express = require("express");
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updateUserPassword,
  updateUserProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/authentication");
const router = express.Router();

router.route("/create").post(createUser);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router
  .route("/updateUserPassword").put(isAuthenticatedUser, updateUserPassword);
router.route("/updateUserProfile").put(isAuthenticatedUser, updateUserProfile);

module.exports = router;
