// Création d'un nouveau fichier router.js
const express = require("express");
const mainController = require("./controllers/mainController");

// Création d'un router
const router = express.Router();

// On configure ce que fait le router
// Création de notre router avec la const objet du controller + la fonction que l'on attend dans la route
router.get("/", mainController.getPseudoSession, mainController.renderHomePage);

router.get("/pokedex", mainController.getPseudoSession, mainController.renderPokedexPage);

router.get("/pokedex/:id", mainController.getPseudoSession, mainController.renderSinglePokemon);

router.get("/login",mainController.getPseudoSession, mainController.loginPage);

router.post("/auth", mainController.getPseudoSession, mainController.loginVerification);

router.get("/signin", mainController.getPseudoSession, mainController.renderSignPage);

router.post("/signin", mainController.getPseudoSession, mainController.loginPost);

// Export du module router
module.exports = router;
