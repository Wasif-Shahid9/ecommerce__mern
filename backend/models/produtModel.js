const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plz Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Plz Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Plz Enter Product Price"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Plz Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Plz Enter Product Stock"],
    maxLength: [4, "Stock is not larger than 10000"],
    default: 1,
  },
  NoOfReviews: {
    type: Number,
    deafult: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
  /// Yh is liye add kiya ta ky pta chly ky kis admin ne kn si product Add ki ha
  user: {
    type: mongoose.Schema.ObjectId,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const produtModel = mongoose.model("Product", productSchema);
module.exports = produtModel;
