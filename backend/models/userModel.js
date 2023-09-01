const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    min: [2, "Name cannot be shorter than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validator: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    min: [8, "Password Should be greater than 8 characters "],
    /// select false krne se yh ho ga ky jb ma data get kroon ga to mujhe password ni mily ga
    select: false,
  },
  userProfile: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
