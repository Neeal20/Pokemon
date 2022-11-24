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

  loginPage: (req,res,next) => {
    try {
      // On renvoi notre page login
      res.render("login");
    } catch (error) {
      console.error;
      // Sinon, on renvoie une erreur
      res.status(500).send(`mainController: ${error.message}`);
      next();
    }
  },

  renderSignPage: (req,res,next) => {
    try {
      // On renvoi notre page inscription
      res.render("signin");
    } catch (error) {
      console.error;
      // Sinon, on renvoie une erreur
      res.status(500).send(`mainController: ${error.message}`);
    }
  },

  loginPost: async (req,res,next) => {
    try {
      // On récupère le pseudo et le password du user
      const usersPseudo = req.body.pseudo;
      const usersPassword = req.body.password;
      const verifyUser = await dataMapper.verifyUserInDb(usersPseudo);
      if(verifyUser === true) {
        res.send("Vous avez déjà un compte");
        res.redirect("/login");
      } // Si l'identifiant est valide
      else if (usersPseudo && usersPassword) {
        const postUser = await dataMapper.postSignInDatas(usersPseudo,usersPassword);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Désolé, une erreur s'est produite");
    }
    res.redirect("/");
  },

  loginVerification: async (req,res,next) => {
    // Récupération du pseudo de l'user
    const usersPseudo = req.body.pseudo;
    // Récupération du mot de passe de l'user
    const usersPassword = req.body.password;
    try {
      // On vérifie que les identifiants existent dans la Db
      const getUser = await dataMapper.getLoginDatas(usersPseudo,usersPassword);
      // SI l'utilisateur existe et est valide
      if (getUser) {
        // On met le log sur true pour garder la session
        req.session.loggedin = true;
        // On défini le pseudo
        req.session.pseudo = usersPseudo;
        console.log(req.session);
        // On redirige vers la page d'accueil
        res.redirect("/");
        // Sinon on renvoi une 404
      } else {
        next();
      }
    } catch (error) {
      res.status(500).send("Identifiants ou mot de passe incorrect");
    }
  },

  getPseudoSession: (req,res,next) => {
    // Middleware pour récupérer le pseudo en fonction de le session de l'utilisateur
    try {
      // SI il a une session, on stock la variable dans une const pseudo
      const pseudo = req.session.pseudo;
      // On envois les variables à toutes nos vues si un pseudo a été trouvée.
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

  searchPokemonByType: async (req,res,next) => {
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

module.exports = mainController;
