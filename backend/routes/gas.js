const express = require("express");
const router = express.Router();
const Gas = require("../models/Gas");
const Comment = require("../models/Comment");
const axios = require("axios");
const base_url = "https://api.datos.gob.mx/v1/precio.gasolina.publico";

router.get("/json", (req, res, next) => {
  axios
    .get(base_url)
    .then(resp => {
      res.status(200).json(resp.data.results);
      let gass = [];
      gass = resp.data.results;
      gass.forEach(gaso => {
        console.log(gaso.latitude);
        let lat = gaso.latitude;
        let lng = gaso.longitude;
        let calle = gaso.calle;
        let location = { calle, coordinates: [lng, lat] };
        let gas = { ...gaso, location };
        console.log(gas);
        Gas.create(gas)
          .then(() => {
            res.status(200).json({ gas });
          })
          .catch(error => {
            error.action = "Error al crear gasolinera";
            next(error);
          });
      });
    })
    .catch(error => {
      error.action = "Error al traer la base de datos";
      next(error);
    });
});

router.post("/new", (req, res, next) => {
  let { lat, lng, calle, ...gas } = req.body;
  let location = { calle, coordinates: [lng, lat] };
  gas = { ...gas, location };
  Gas.create(gas)
    .then(() => {
      res.status(200).json({ gas });
    })
    .catch(error => {
      error.action = "Error al crear gasolinera";
      next(error);
    });
});

router.get("/", (req, res) => {
  Gas.find().then(gass => {
    res.status(200).json({ gass });
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Gas.findById(id)
    .populate("comments")
    .then(gas => res.status(200).json(gas))
    .catch(error => {
      error.action = "Error al ver detalle";
      next(error);
    });
});

router.post(
  "/:id/review",
  //uploadCommentPicture.single("commentPic"),
  (req, res, next) => {
    const { id } = req.params;
    let file = req.file;
    if (file == undefined) {
      var imagePath = null;
      var imageName = null;
    } else {
      imagePath = req.file.url;
      imageName = req.file.originalname;
    }
    let { content, rating } = req.body;
    let authorId = req.user;
    Comment.create({ imagePath, content, authorId, imageName, rating }).then(
      comment => {
        Gas.findByIdAndUpdate(id, { $push: { comments: comment } })
          .then(gas => res.status(200).json(gas))
          .catch(error => {
            error.action = "Error al crear comentario";
            next(error);
          });
      }
    );
  }
);

module.exports = router;
