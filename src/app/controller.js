const req = require("express/lib/request");
const productRepository = require("./repository");

exports.createProduct = async (req, res) => {
  console.log("create prodeiucts params", req.body);
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
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

exports.register = async (req, res) => {
  console.log("register req", req.body);
  try {
    let { name, email, password } = req.body;
    if (name && email && password) {
      const user = await productRepository.register({ name, email, password });
      if (user.error === "User already exists") {
        res.status(409).json({
          status: false,
          error: user.error,
        });
        return;
      }
      res.status(201).json({ status: true, data: user });
    } else {
      res.status(400).json({
        status: false,
        error: "name, email and password is required",
      });
      return;
    }
  } catch (e) {
    console.log("error in register, controller.js", e);
    res.status(500).json({
      status: false,
      error: e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (email && password) {
      let user = await productRepository.login({ email, password });
      if (user) {
        res.status(200).json({
          status: true,
          data: user,
        });
      } else {
        res.status(401).json({
          status: false,
          error: "No user found",
        });
        return;
      }
    } else
      res.status(400).json({
        status: false,
        error: "email and password is required",
      });
    return;
  } catch (e) {
    res.status(500).json({
      status: false,
      error: e,
    });
  }
};
