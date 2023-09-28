const { JsonWebTokenError } = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login first to access this",
      });
    }
    const decodeToken = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decodeToken.id);
    // ('req.userauth', req.user)
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/// Admin Authentication Roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      const { role } = req.user;
      // (role, req.user);
      // const roleA = UserModel.find({ role });

      if (!roles.includes(role)) {
        return res.status(401).json({
          success: false,
          message: "You are not allowed to access this",
        });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
