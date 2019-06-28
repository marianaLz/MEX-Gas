const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authUtils = require("../helpers/auth");
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
      jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 86400 },
        (error, token) => {
          if (error)
            return res
              .status(500)
              .json({ error, message: "Error al crear token" });
          user = authUtils.cleanUser(user._doc);
          res.status(200).json({ user, token });
        }
      );
    })
    .catch(error => {
      error.action = `Error al crear el usuario ${newUser.username}`;
      next(error);
    });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  return res.json({ user });
  // User.findOne({ email })
  //   .then(user => {
  //     if (!user)
  //       return res
  //         .status(404)
  //         .json({ error: {}, message: "Nombre de usuario no encontrado" });
  //     const isPasswordValid = bcrypt.compareSync(password, user.password);
  //     if (!isPasswordValid)
  //       return res
  //         .status(401)
  //         .json({ error: {}, message: "Password inválido" });
  //     jwt.sign(
  //       { id: user._id },
  //       process.env.SECRET,
  //       { expiresIn: process.env.TOKENLIFETIME },
  //       (error, token) => {
  //         if (error) {
  //           return res
  //             .status(500)
  //             .json({ error, message: "Error en la creación del token" });
  //         }

  //         user = authUtils.cleanUser(user._doc);
  //         return res.status(200).json({ user, token });
  //       }
  //     );
  //   })
  //   .catch(error => {
  //     error.action = "Error durante el proceso de login";
  //     next(error);
  //   });
});

module.exports = router;
