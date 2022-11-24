// On importe le dataMapper
const dataMapper = require("../dataMapper");

// Création d'un objet
const mainController = {
  // On imbrique nos fonctions qui sont en faite nos routes
  renderHomePage:  (req,res) => {
    try {
      // On affiche notre page d'accueil
      res.render("home");
    } catch (error) {
      // Sinon, on renvoie une erreur
      res.status(500).send(`mainController: ${error.message}`);
    }
  },

  renderPokedexPage: async (req,res,next) => {
    try {
      // On récupère le nombre de figurines par catéories
      const listPokemons = await dataMapper.getAllPokemons();
      // On renvoi notre vue pokedex avec la variable listPokemons
      res.render("pokedex", { listPokemons });
    } catch (error) {
      // Sinon, on renvoie une erreur
      res.status(500).send(`mainController: ${error.message}`);
      next();
    }
  },

  renderSinglePokemon: async (req,res,next) => {
    // On récupère dans les params de l'url, l'id
    const targetId = req.params.id;
    try {
      // On récupère dans la Db le Pokémon grâce à son id
      const singlePokemon = await dataMapper.getSinglePokemon(targetId);
      // On renvoi notre vue Pokémon avec la variable singlePokemon
      res.render("pokemon", { singlePokemon });
    } catch (error) {
      // Sinon, on renvoie une erreur
      res.status(500).send("Désolé, une erreur s'est produite");
      next();
    }
  },
};

module.exports = mainController;
