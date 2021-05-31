const { Telegraf } = require("telegraf");
const bot = new Telegraf("1800553033:AAG6e3S45-qJd0BFgKvyVAeybpW6UBN2k1M");
const axios = require("axios");

bot.start((ctx) => {
  ctx.reply(
    "Bienvenidx! Soy Claqueta bot.\n\nSoy tu ayudante y selector de películas. Para comenzar escribe /help"
  );
});

bot.help((ctx) => {
  ctx.reply(
    "Puedo ayudarte a mantener tu lista de peliculas.\nPodés controlarme utilizando estos comandos:\n\n/lista, /l - ver tu listado de peliculas\n/random, /r - recibir una pelicula aleatoria y eliminarla de la base de datos.\n*texto* - para añadir texto como nueva película."
  );
});

bot.hears("Shrek", (ctx) => {
  ctx.reply("De nuevo? Posta?");
});

bot.command(["random", "r"], (ctx) => {
  let id = "";

  axios
    .get("http://localhost:3000/api/peliculas/")
    .then((response) => {
      this.response = response.data;
      return this.response;
    })
    .catch((error) => {
      console.log(error);
    })
    .then((data) => {
      if (data.length != 0) {
        let res = "";
        const rand = Math.floor(Math.random() * data.length);

        res = data[rand].nombre;
        id = data[rand]._id;

        ctx.reply(res);
        axios
          .delete(`http://localhost:3000/api/peliculas/${id}`)
          .then((response) => {
            console.log(
              "Codigo",
              response.status,
              "- Status:",
              response.statusText,
              "-",
              response.data.status
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        ctx.reply("No hay más peliculas!");
      }
    });
});

bot.command(["lista", "l"], (ctx) => {
  axios
    .get("http://localhost:3000/api/peliculas/")
    .then((response) => {
      this.response = response.data;
      return this.response;
    })
    .catch((error) => {
      console.log(error);
    })
    .then((data) => {
      let res = `Tus películas son: \n`;
      data.map((e, i) => {
        res += `• ${i + 1}: ${e.nombre}\n`;
      });
      console.log(res);
      ctx.reply(res);
    });
});

bot.on("text", (ctx) => {
  console.log(ctx.message.text);
  axios
    .post("http://localhost:3000/api/peliculas/", {
      nombre: ctx.message.text,
      status: "No vista",
    })
    .then((response) => {
      console.log(
        "Codigo",
        response.status,
        "- Status:",
        response.statusText,
        "-",
        response.data.status
      );
      ctx.reply(`¡${response.data.status} con exito!`);
    })
    .catch((error) => {
      console.log(error);
    });
});

bot.launch();
