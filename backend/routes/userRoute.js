const express = require("express");
const {
  createUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updateUserPassword,
  updateUserNameAndEmail,
  getUserDetailByAdmin,
  getSingleUserDetailByAdmin,
  updateUserProfileByAdmin,
  deleteUserByAdmin,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authentication");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

/// User OWN
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router
  .route("/updateUserPassword")
  .put(isAuthenticatedUser, updateUserPassword);
router
  .route("/updateUserNameAndEmail")
  .put(isAuthenticatedUser, updateUserNameAndEmail);

//   (ADMIN)

router
  .route("/getUserDetailByAdmin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetailByAdmin);

router
  .route("/getSingleUserDetailByAdmin/:id")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getSingleUserDetailByAdmin
  );
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserProfileByAdmin);
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserByAdmin);

module.exports = router;
