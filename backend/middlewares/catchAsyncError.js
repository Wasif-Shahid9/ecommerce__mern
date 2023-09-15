// module.exports =  thefun => (req, res, next) => {
//   Promise.resolve(thefun (req, res, next)).catch(next);
// };

module.exports = (thefun) => (req, res, next) => {
  Promise.resolve(thefun(req, res, next)).catch((error) => {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          "Validation error: Some required fields are missing or invalid.",
        errors: error.errors,
      });
    } else {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request. Internal Server Error",
      });
    }
  });
};
