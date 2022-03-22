const Product = require("./model");

exports.product = async () => {
  const products = await Product.find();
  return products;
};

exports.productById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.createProduct = async (item) => {
  const newProduct = await Product.create(item);
  return newProduct;
};

exports.removeProduct = async (id) => {
  const product = await Product.findByIdAndRemove(id);
  return product;
};
