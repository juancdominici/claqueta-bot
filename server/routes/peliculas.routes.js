const express = require("express");
const router = express.Router();

const peliculaController = require("../controllers/pelicula.controller.js");

// Peliculas routes
router.get("/", peliculaController.getPeliculas);
router.post("/", peliculaController.createPelicula);
router.put("/:id", peliculaController.actualizarEstadoPelicula);
router.delete("/:id", peliculaController.borrarPelicula);

module.exports = router;
