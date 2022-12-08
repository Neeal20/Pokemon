// Création d'un nouveau fichier router.js
const express = require("express");

// Import des controllerss
const mainController = require("./controllers/mainController");
const loginController = require("./controllers/loginController");
const searchController = require("./controllers/searchController");
const bookmarksController = require("./controllers/bookmarkController");

// Création d'un router
const router = express.Router();

// On configure ce que fait le router
// Création de notre router avec la const objet du controller + la fonction que l'on attend dans la route
router.get("/", loginController.getPseudoSession, mainController.renderHomePage);

// AFficher tout les Pokémons de la Db
router.get("/pokedex", loginController.getPseudoSession, mainController.renderPokedexPage);

// Afficher l'information d'un Pokémon via son ID
router.get("/pokedex/:id", loginController.getPseudoSession, mainController.renderSinglePokemon);

// Connection de l'utilisateur sur le site
router.get("/login",loginController.getPseudoSession, loginController.loginPage);

// Contrôle de l'authentification / Eviter les doublons dans la Db
router.post("/auth", loginController.getPseudoSession, loginController.loginVerification);

// Afficher la page login
router.get("/signin", loginController.getPseudoSession, loginController.renderSignPage);

// Déconnection de l'utilisateur
router.get("/logout", loginController.getPseudoSession, loginController.logoutSession);

// Inscription utilisateur dans la Db
router.post("/signin", loginController.getPseudoSession, loginController.loginPost);

// Fonction de recherche de pokémon par type
router.get("/search/pokemon/type", loginController.getPseudoSession, searchController.searchPokemonByType);

// Fonction de recherche de pokémon par nom
router.get("/search/pokemon/name", loginController.getPseudoSession, searchController.searchPokemonByName);

// Affichage de la page des favoris
router.get("/favoris", loginController.getPseudoSession, bookmarksController.renderBookmarks);

// Export du module router
module.exports = router;
