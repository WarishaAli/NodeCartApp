require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
require("./config/database.js")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Hope you complete this",
  });
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log("App running on ", port);
});
