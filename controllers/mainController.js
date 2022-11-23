// On importe le dataMapper
const dataMapper = require("../dataMapper");
const { search } = require("../router");

// Création d'un objet
const mainController = {
  // On imbrique nos fonctions qui sont en faite nos routes
  renderHomePage:  (req,res) => {
    try {
      res.render("home");
    } catch (error) {
      res.status(500).send(`mainController: ${error.message}`);
    }
  },

  renderPokedexPage: async (req,res,next) => {
    try {
      // On récupère le nombre de figurines par catéories
      const listPokemons = await dataMapper.getAllPokemons();
      res.render("pokedex", { listPokemons });
    } catch (error) {
      res.status(500).send(`mainController: ${error.message}`);
      next();
    }
  },

  renderSinglePokemon: async (req,res,next) => {
    const targetId = req.params.id;
    try {
      const singlePokemon = await dataMapper.getSinglePokemon(targetId);
      res.render("pokemon", { singlePokemon });
    } catch (error) {
      res.status(500).send("Désolé, une erreur s'est produite");
      next();
    }
  },

  loginPage: (req,res,next) => {
    try {
      res.render("login");
    } catch (error) {
      console.error;
      res.status(500).send(`mainController: ${error.message}`);
      next();
    }
  },

  renderSignPage: (req,res,next) => {
    try {
      res.render("signin");
    } catch (error) {
      res.status(500).send(`mainController: ${error.message}`);
    }
  },

  loginPost: async (req,res,next) => {
    try {
      // On récupère le pseudo et le password du user
      const usersPseudo = req.body.pseudo;
      const usersPassword = req.body.password;

      // Si l'identifiant est valide
      if (usersPseudo && usersPassword) {
        const postUser = await dataMapper.getSignInDatas(usersPseudo,usersPassword);
        console.log("Inscription Valide : ",postUser);
      } else {
        // Si identifiants est mauvais
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Désolé, une erreur s'est produite");
    }
    res.redirect("/");
  },

  loginVerification: async (req,res,next) => {
    const usersPassword = req.body.password;
    try {
      const usersPseudo = req.body.pseudo;
      const getUser = await dataMapper.getLoginDatas(usersPseudo,usersPassword);
      if (getUser) {
        console.log("Réussis + :",getUser);
        req.session.loggedin = true;
        req.session.pseudo = usersPseudo;
        console.log(req.session);
        res.redirect("/");
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send("Identifiants ou mot de passe incorrect");
    }
  },

  getPseudoSession: (req,res,next) => {
    try {
      const pseudo = req.session.pseudo;
      res.locals.name = pseudo;
      next();
    } catch (error) {
      res.status(500).send("Désolé, une erreur s'est produite");
    }
  },

  searchPokemonByName: async (req,res,next) => {
    const searchPokemon = req.query.name;

    try {
      // Récupère notre méthode dataMapper pour trouver afficher les pokémons via leurs noms
      const pokemonName = await dataMapper.getPokemonBySearch(searchPokemon);
      // On envois nos data à notre vue
      res.render("pokemonSearchName", { pokemonName });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  searchPokemonByType: async (req,res,next) => {
    const searchType = req.query.type;
    try {
      // Récupère notre méthode dataMapper pour trouver afficher les pokémons via leurs noms
      const pokemonType = await dataMapper.getPokemonByType(searchType);
      // On envois nos data à notre vue
      res.render("pokemonType", { pokemonType });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
};

module.exports = mainController;
