const dataMapper = require("../dataMapper");

const loginController = {
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

  renderSignPage: (req,res) => {
    try {
      // On renvoi notre page inscription
      res.render("signin");
    } catch (error) {
      console.error;
      // Sinon, on renvoie une erreur
      res.status(500).send(`mainController: ${error.message}`);
    }
  },

  loginPost: async (req,res) => {
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
        console.log(postUser);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Désolé, une erreur s'est produite");
    }
    res.redirect("/login");
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

  logoutSession: (req,res,next) => {
    try {
      if(req.session) {
        req.session.destroy();
      }
      // On renvoi notre page login
      res.redirect("/");
    } catch (error) {
      console.error;
      // Sinon, on renvoie une erreur
      res.status(500).send(`loginController: ${error.message}`);
    }
    next();
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
};

module.exports = loginController;
