const client = require("./database");

const dataMapper = {
  getAllPokemons: async () => {
    const result = await client.query("SELECT * FROM \"pokemons\" ORDER BY \"id\" ASC;");
    const figurineList = result.rows;

    // On renvoie avec la méthode
    return figurineList;
  },

  getSinglePokemon: async (targetId) => {
    const queryString = "SELECT * FROM pokemons WHERE id=$1";
    const values = [ targetId];

    const result = await client.query(queryString, values);
    // Si la query a fonctionné on est censé récupéré un seul élément dans notre tableau
    if(result.rows.length === 1) {
    // on récupère la figurine dans une variable
      const pokemon = result.rows[0];
      // Si on a bien une figurine qui correspond, on la renvoie au controller
      return pokemon;

    } else {
    // Sinon on renvoie null
      return null;
    }
  },

  postSignInDatas: async (usersPseudo,usersPassword) => {
    // Insérer dans la Db les informations de l'utilisateur
    const queryString = `
    INSERT INTO "users"(
      "pseudo",
      "password"
      )
    VALUES ($1, $2)`;

    const values = [usersPseudo,usersPassword];
    const result = await client.query(queryString, values);
    console.log(result);

    // Si le résultat est valide
    if(result) {
      const user = result;
      // On return le user
      return user;
    } else {
      // Sinon null
      return null;
    }
  },

  getLoginDatas : async (usersPseudo,usersPassword) => {
    // On regarde si l'utilisateur est inscrit et existe dans notre Db
    const queryString = `SELECT * FROM "users" WHERE "pseudo" = '${usersPseudo}' AND "password" = '${usersPassword}' `;
    const result = await client.query(queryString);

    // Si il existe
    if(result.rows.length === 1) {
      const user = result.rows[0];
      // On return le user
      return user;
    } else {
      return null;
    }
  },

  verifyUserInDb: async (usersPseudo) => {
    const queryString = "SELECT EXISTS( SELECT * FROM users WHERE \"pseudo\" = $1)";
    const values = [ usersPseudo ];

    const result = await client.query(queryString, values);
    console.log("BLABLABLA", result.rows[0]);

    if(result.rows === true) {
      return;
    }
  },

  getPokemonBySearch: async (searchPokemon) => {
    const queryString = "SELECT * FROM pokemons WHERE  \"name\" ILIKE '%'|| $1 || '%'";
    const values = [ searchPokemon ];

    const result = await client.query(queryString, values);

    if(result.rows.length === 1) {
      // on récupère la query dans une variable
      const element = result.rows[0];
      // Si on a bien une query qui correspond, on la renvoie au controller
      return element;
    } else {
      // Sinon on renvoie null
      return null;
    }
  },

  getPokemonByType: async (searchType) => {
    const queryString = `SELECT * FROM pokemons WHERE '${searchType}' ilike ANY(type)`;

    const result = await client.query(queryString);

    if(result.rows) {
      // on récupère la query dans une variable
      const element = result.rows;
      // Si on a bien une query qui correspond, on la renvoie au controller
      return element;
    } else {
      // Sinon on renvoie null
      return null;
    }
  }

};

module.exports = dataMapper;
