const Pelicula = require("../models/pelicula");

const peliculaController = {};

peliculaController.getPeliculas = async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
};

peliculaController.createPelicula = async (req, res) => {
  const pelicula = new Pelicula(req.body);
  await pelicula.save();
  res.json({
    status: "Película guardada",
  });
};

peliculaController.actualizarEstadoPelicula = async (req, res) => {
  const { id } = req.params;
  const pelicula = {
    nombre: req.body.nombre,
    status: req.body.status,
  };
  await Pelicula.findByIdAndUpdate(id, { $set: pelicula }, { new: true });
  res.json({
    status: "Película actualizada",
  });
};

peliculaController.borrarPelicula = async (req, res) => {
  await Pelicula.findByIdAndRemove(req.params.id);
  res.json({ status: "Película eliminada" });
};

module.exports = peliculaController;
