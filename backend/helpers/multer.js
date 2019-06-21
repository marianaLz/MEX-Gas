const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDSECRET
});

let storageCommentPictures = cloudinaryStorage({
  cloudinary,
  folder: "comment-pictures",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, req.file);
  }
});

const uploadCommentPicture = multer({ storage: storageCommentPictures });

module.exports = {
  uploadCommentPicture
};
