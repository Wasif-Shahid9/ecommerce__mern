const ProductModel = require("../models/produtModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");

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
const deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    res.status(4040).json({
      success: false,
      mesaage: "Product Not Found",
    });
  }
  await ProductModel.deleteOne({ id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});
/// GET Product Detail
const getProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  console.log(product);

  if (!product) {
    res.status(404).json({
      success: false,
      mesaage: "Product Not Found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

module.exports = {
  getAllProducts,
  // searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};
