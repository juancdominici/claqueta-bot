const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/db";

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) =>
    console.log(
      "Conectado a la base de datos Mongo en: ",
      db.connections[0]._connectionString
    )
  )
  .catch((err) =>
    console.error("Error al conectar a la base de datos Mongo: ", err)
  );

module.exports = mongoose;
