const jwt = require("jsonwebtoken");

const sendCookie = (user, res, message) => {
  console.log("JWTUSER", user);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      // maxAge: 30 * 60 * 1000,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
    });
};

module.exports = sendCookie;
