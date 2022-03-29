const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, path.join("./files/"));
  },
  filename: (_, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    callback(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  console.log("file in file filter", file);
  if (file.mimetype?.includes("image")) {
    callback(null, true);
  } else callback(new Error("Not an image, please upload an image"));
};

exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});
