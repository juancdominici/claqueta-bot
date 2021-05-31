const express = require("express");
const app = express();
const morgan = require("morgan");
const { mongoose } = require("./database");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares

// **Solución de politicas de CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/peliculas", require("./routes/peliculas.routes"));

// Starting server
app.listen(app.get("port"), () => {
  console.log("Server en puerto:", app.get("port"));
});
