const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uploadCloud = require("../helpers/multer");
const authUtils = require("../helpers/auth");

const User = require("../models/User");

authRouter.post("/register", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  if (req.body.password.length < 8) {
    return res.status(400).json({
      error: {},
      message: "Your password is not long enough."
    });
  }
  User.create({ ...req.body, password: hashedPassword })
    .then(user => {
      req.user = user;
      jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 86400 },
        (err, token) => {
          delete user._doc.password;
          res.status(200).json({ token, user });
        }
      );
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "There was an error creating your user."
      });
    });
});

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({
        error: {},
        message: "Incorrect username"
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        error: {},
        message: "Incorrect password"
      });
    }

    jwt.sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: 86400 },
      (err, token) => {
        delete user._doc.password;
        res.status(200).json({ token, user });
      }
    );
  });
});

module.exports = authRouter;
