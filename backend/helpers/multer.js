const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mex-gas",
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
