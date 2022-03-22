const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: String,
    required: [true, "Product price is required"],
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
