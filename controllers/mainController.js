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
      console.log(req.query);
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

  loginPage: async (req,res,next) => {
    try {
      // On récupère le pseudo et le password du user
      const usersPseudo = req.body.pseudo;
      const usersPassword = req.body.password;

      // Si l'identifiant est valide
      if (usersPseudo && usersPassword) {
        const postUser = await dataMapper.getLoginDatas(usersPseudo,usersPassword);
        console.log(postUser);
      } else {
        // Si identifiants est mauvais
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Désolé, une erreur s'est produite");
    }
    res.render("login");
  }
};

module.exports = mainController;
