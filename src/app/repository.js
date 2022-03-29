const { Product } = require("./model");
const { User } = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

exports.products = async () => {
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

exports.register = async (payload) => {
  const { name, email, password } = payload;
  console.log("register params", payload);
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return {
      error: "User already exists",
    };
  }
  const encryptedPassword = await bcrypt.hash(password.toString(), 10);
  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });
  const token = jwt.sign(
    { user_id: newUser._id.toString(), email },
    process.env.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
  newUser.token = token;
  return newUser;
};

exports.login = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("user in login repository js", user);
    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    return user;
  } else
    return {
      status: false,
      error: user,
    };
};
