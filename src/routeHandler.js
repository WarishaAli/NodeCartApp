const productRoutes = require("./app/routes");

module.exports = (app) => {
  app.use("/product", productRoutes);
};
