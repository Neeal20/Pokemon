// On importe le dataMapper
const dataMapper = require("../dataMapper");

// Création d'un objet
const mainController = {
  // On imbrique nos fonctions qui sont en faite nos routes
  renderHomePage:  (req,res) => {
    res.render("home");
  },

  renderPokedexPage: async (req,res,next) => {
    try {
      // On récupère le nombre de figurines par catéories
      const listPokemons = await dataMapper.getAllPokemons();
      res.render("pokedex", { listPokemons });
    } catch (error) {
      res.status(500).send(`mainController: ${error.message}`);
    }
    next();
  },

  renderSinglePokemon: async (req,res,next) => {
    const targetId = req.params.id;
    const singlePokemon = await dataMapper.getSinglePokemon(targetId);
    console.log(singlePokemon);
    res.render("pokemon", { singlePokemon });
    next();
  },

  loginPage: (req,res,next) => {
    res.render("login");
  }
};

module.exports = mainController;
