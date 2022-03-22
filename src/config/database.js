const mongoose = require("mongoose");

const cleanup = () => {
  mongoose.connection.close(() => process.exit(0));
};

module.exports = (app) => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    //   useFindAndModify: false,
    })
    .then((res) => {
      console.log("Successfully connected to db");
    })
    .catch((err) => {
      console.log("Error in connecting to db", err);
      process.exit(1);
    });
  mongoose.Promise = global.Promise;
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup);
  if (app) {
    app.set("mongoose", mongoose);
  }
};
