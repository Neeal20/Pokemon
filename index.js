const express = require("express");
const router = require("./router");
const expressSession = require("express-session");
const port = process.env.PORT || 8000;
const app = express();


// Configuration du moteur de template EJS
app.set("view engine", ("ejs"));
app.set("views", ("./views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public")); // Fichier accessible sans créer de route grâce au "public"

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));

// Appel du routeur
app.use(router);


// Apres le router, (ie. si la requête n'est pas interceptée et terminé par un des controllers du router), alors on passe au middleware de la 404
app.use((req, res) => {
  res.status(404); // Mettre le status code à 404 // Version 'EXPRESS' de `res.statusCode = 404` du module 'http'
  res.render("404"); // On termine la requête par une page EJS
  // Pas besoin de next, on a pas mis de middleware après (si on en avait un qui nous interesse, pourquoi pas ! Mais là non)
});


app.listen(port, () => {
  console.log("Server app listening on port " + port);
});

