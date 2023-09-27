const ProductModel = require("../models/produtModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const multer = require("multer");

/// create Product POST

const createProduct = catchAsyncError(async (req, res, next) => {
  const products = await ProductModel.create(req.body);

  res.status(201).json({
    success: true,
    products,
  });
});

const getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const apifeature = new ApiFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    resultPerPage,
  });
});

///
// let page = Number(req.query.page) || 1;
// let limit = Number(req.query.limit) || 3;

// GET All Products  ADMIN
// const getAllProducts = async (req, res) => {
//   try {
//     const keyword = req.query.name || "";

//     if (!keyword) {
//       return res.status(200).json({
//         success: true,
//       });
//     }

//     const products = await ProductModel.find({
//       name: { $regex: keyword, $options: "i" },
//     });

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     // Handle errors, e.g., send an error response
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// };

// Search for products
// const getAllProducts = catchAsyncError(async (req, res) => {
//   const keyword = req.query.name || "";

//   const products = await ProductModel.find({
//     name: { $regex: keyword, $options: "i" },
//   });
//   res.status(200).json({
//     success: true,
//     products,
//   });
// });

// Update   Products  ADMIN
// const updateProduct = async (req, res, next) => {
//   let product = await ProductModel.findById(req.params.id);
//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product Not Found",
//     });
//   }

//   const updateProduct = await findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!updateProduct) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update product",
//     });
//   }
//   res.status(201).json({
//     success: true,
//     message: "Product updated successfully",
//     product: updateProduct,
//   });
// };

// Update Product
const updateProduct = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const updates = req.body;

  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updates,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

/// Delete Product
// const deleteProduct = async (req, res, next) => {
//   try {
//     let product = await ProductModel.findById(req.params.id);
//     console.log("Parms", req.params.id);
//     console.log("deleteProduct", product);
//     if (!product) {
//       res.status(404).json({
//         success: false,
//         mesaage: "Product Not Found",
//       });
//     }
//     await ProductModel.deleteOne({ id: req.params.id });

//     res.status(200).json({
//       success: true,
//       message: "Product Delete Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    const deletedProduct = await ProductModel.deleteOne({ _id: req.params.id });

    if (deletedProduct.deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to delete product",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/// GET Product Detail
const getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  console.log("productDetail", Array.isArray(product.reviews));

  if (!product) {
    return res.status(404).json({
      success: false,
      mesaage: "Product Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products Admin
const getAdminProducts = catchAsyncError(async (req, res) => {
  const products = await ProductModel.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//// Reviews
const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found With this id",
    });
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found With this id",
    });
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// Define the storage engine and destination for uploaded images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images"); // Images will be stored in the "images" directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Handle image uploads
// const uploadFile = (req, res) => {
//   // The uploaded image is available as req.file
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded." });
//   }

//   // You can save the file information in your database here if needed.

//   res.status(200).json({ message: "File uploaded successfully." });
// };

module.exports = {
  getAllProducts,
  // searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  getAdminProducts,
  createProductReview,
  getProductReviews,
  deleteReview,
};
