const productRepository = require("./repository");

exports.createProduct = async (req, res) => {
  console.log("create prodeiucts params", req.body);
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
    };
    let product = await productRepository.createProduct(payload);
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      error: e,
    });
  }
};

exports.getProducts = async (_, res) => {
  try {
    let products = await productRepository.products();
    res.status(200).json({
      status: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      error: e,
    });
  }
};
exports.getProductById = async (req, res) => {
  try {
    let id = req.params.id;
    let productDetails = await productRepository.productById(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let productDetails = await productRepository.removeProduct(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
