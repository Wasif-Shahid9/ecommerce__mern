const ProductModel = require("../models/produtModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");

const reviews = async (req, res, next) => {
  ///req.user me login user ki sari details hn to hm wha se poora user get kr lyn gy
  // req.body: ab rating or comment to koi user khud hi dy ga
  try {
    const { rating, comment } = req.body;
    const { name, _id } = req.user;
    const review = {
      rating: Number(rating),
      comment,
      name,
      _id,
    };
  } catch (error) {
    console.log(error);
  }
};
reviews();

const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find all reviews for the specified product
    const reviews = await ProductModel.find({ product: productId });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route to delete a review
const deleteReciew = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Find and delete the review by its ID
    await ProductModel.findByIdAndDelete(reviewId);

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
