const dataMapper = require("../dataMapper");

const searchController = {
  searchPokemonByName: async (req,res,next) => {
    // Récupération de nom cherché dans la barre de recherche
    const searchPokemon = req.query.name;
    try {
      // Récupère notre méthode dataMapper pour trouver afficher les pokémons via leurs noms
      const pokemonName = await dataMapper.getPokemonBySearch(searchPokemon);
      // Si le pokemon existe dans la Db
      if(pokemonName) {
        // On envois nos data à notre vue
        res.render("pokemonSearchName", { pokemonName });
      } else {
        // Sinon on renvoi une 404
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  searchPokemonByType: async (req,res) => {
    const searchType = req.query.type;
    console.log(searchType);
    try {
      // Récupère notre méthode dataMapper pour trouver afficher les pokémons via leurs noms
      const pokemonType = await dataMapper.getPokemonByType(searchType);
      // On envois nos data à notre vue
      res.render("pokemonType", { pokemonType, searchType });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
};

module.exports = searchController;
