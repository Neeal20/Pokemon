// On importe le dataMapper
const dataMapper = require("../dataMapper");


// Création d'un objet
const bookmarksController = {
  renderBookmarks: (req,res,next) => {
    res.render("favoris");
  },

  sessionBookmarks: (req,res,next) => {
    if(req.session.bookmarks) {
      req.session.bookmarks = [];
      next();
    }
  }
};

module.exports = bookmarksController;
