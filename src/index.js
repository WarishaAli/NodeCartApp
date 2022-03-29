require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/files", express.static("files"));
require("./config/database.js")(app);
require("./routeHandler")(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("App running on ", port);
});
