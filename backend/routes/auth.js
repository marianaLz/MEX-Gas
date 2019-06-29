const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const crypto = require("crypto");
const isProduction = process.env.NODE_ENV === "production";

router.post("/register", (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const randomToken = crypto.randomBytes(25).toString("hex");
  const newUser = {
    ...req.body,
    confirmationCode: randomToken,
    password: hashedPassword
  };
  User.create(newUser)
    .then(user => {
      return res.json({ user });
    })
    .catch(error => {
      error.action = `Error al crear el usuario ${newUser.username}`;
      next(error);
    });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid)
        return res
          .status(401)
          .json({ error: {}, message: "Password inválido" });
      return res.json({ user });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
