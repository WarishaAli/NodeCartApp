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
  image: {
    type: String,
    required: true,
  },
});
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
  },
});
const Product = mongoose.model("Product", ProductSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Product, User };
