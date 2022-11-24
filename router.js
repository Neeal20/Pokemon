// Création d'un nouveau fichier router.js
const express = require("express");

// Import des controllerss
const mainController = require("./controllers/mainController");
const loginController = require("./controllers/loginController");
const searchController = require("./controllers/searchController");

// Création d'un router
const router = express.Router();

// On configure ce que fait le router
// Création de notre router avec la const objet du controller + la fonction que l'on attend dans la route
router.get("/", loginController.getPseudoSession, mainController.renderHomePage);

router.get("/pokedex", loginController.getPseudoSession, mainController.renderPokedexPage);

router.get("/pokedex/:id", loginController.getPseudoSession, mainController.renderSinglePokemon);

router.get("/login",loginController.getPseudoSession, loginController.loginPage);

router.post("/auth", loginController.getPseudoSession, loginController.loginVerification);

router.get("/signin", loginController.getPseudoSession, loginController.renderSignPage);

router.post("/signin", loginController.getPseudoSession, loginController.loginPost);

router.get("/search/pokemon/type", loginController.getPseudoSession, searchController.searchPokemonByType);

router.get("/search/pokemon/name", loginController.getPseudoSession, searchController.searchPokemonByName);

// Export du module router
module.exports = router;
