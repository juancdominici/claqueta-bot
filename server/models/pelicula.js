const mongoose = require("mongoose");
const { Schema } = mongoose;

const PeliculaSchema = new Schema({
  nombre: { type: String, required: true },
  status: { type: String },
});

module.exports = mongoose.model("Pelicula", PeliculaSchema);
