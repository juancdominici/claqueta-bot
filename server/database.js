const mongoose = require("mongoose");
const URI = process.env.MONGO_URI

mongoose
  .set('useFindAndModify', false)
  .connect(URI, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then((db) =>
    console.log(
      "Conectado a la base de datos en: ",
      `\x1b[33m${db.connections[0].host}:${db.connections[0].port}`
    )
  )
  .catch((err) =>
    console.error("Error al conectar a la base de datos Mongo -", err)
  );

module.exports = mongoose;