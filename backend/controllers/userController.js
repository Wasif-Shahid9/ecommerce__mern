const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendCookie = require("../utils/jwtTokenSign");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendEmailMailer = require("../utils/sendEmail");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const validator = require("validator");

//Create User
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // res.status(201).json({
    //   success: true,
    //   message: "Registration successful",
    // });
    sendCookie(user, res, "User is created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Login User

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not exist please register first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    console.log("user password", password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendCookie(user, res, "Login Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//// Logout User
const logout = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};

////  Reset Password
const getResetPasswordToken = (user) => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // user.resetPasswordExpire = Date.now * 60 * 30 * 1000;
  user.resetPasswordExpire = Date.now() + 60 * 30 * 1000;

  return resetToken;
};

//// Forgot Password

const forgotPassword = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      succsss: false,
      message: "User is not Found",
    });
  }
  const resetToken = getResetPasswordToken(user);
  console.log(resetToken);

  await UserModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: resetToken } }
  );

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}  \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmailMailer({
      email: user.email,
      subject: " Ecommerce  Password reset token",
      text: message,
    });
    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      success: false,
      message: "Interval Server Error",
    });
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  console.log(token);

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const { newPassword, confirmPassword } = req.body;
  console.log("newPassword", newPassword, confirmPassword);

  const user = await UserModel.findOne({
    password: token,
  });

  // const user = await UserModel.findOne({
  //   resetPasswordToken,
  //   resetPasswordExpire: { $gt: Date.now() },
  // });
  console.log("user", user);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendCookie(user, res, "User is created successfully");
};

//// User Profile
const getUserDetail = async (req, res, next) => {
  /// req.user me hi hm poora user save krwa rhy authentication me or hm ne isy protected route bnaya ha  to hm us user se kch bhi get kr skte hn
  try {
    console.log("req.user", req.user);
    const user = await UserModel.findById(req.user.id);
    console.log(user);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update User Password
const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const { previousPass, newPass, confirmPass } = req.body;

  // Find the user by their ID (or some identifier) and select the current hashed password
  const user = await UserModel.findById(req.user._id).select("password");
  console.log(user);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(previousPass, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "Previous password is incorrect",
    });
  }

  if (newPass !== confirmPass) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  const hashedNewPassword = await bcrypt.hash(newPass, 10);

  user.password = hashedNewPassword;
  await user.save();

  res.status(201).json({
    success: true,
    message: "Password updated successfully",
  });
});

const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, //Return the updated user
      runValidators: true,
      useFindAndModify: false,
    }
  );
});

module.exports = {
  login,
  createUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetail,
  updateUserPassword,
  updateUserProfile,
};