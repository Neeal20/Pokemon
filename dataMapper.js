const client = require("./database");
const bcrypt = require("bcryptjs");

const dataMapper = {
  getAllPokemons: async () => {
    // Récupérer les datas de tous les pokemon de la Db
    const result = await client.query("SELECT * FROM \"pokemon\" ORDER BY \"id\" ASC;");
    const figurineList = result.rows;

    // On renvoie avec la méthode
    return figurineList;
  },

  getSinglePokemon: async (targetId) => {
    const queryString = "SELECT * FROM pokemon WHERE id=$1";
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
      "email",
      "password"
      )
    VALUES ($1, $2)`;

    // Crypter le mot de passe par une chaîne de caractère aléatoire
    let salt = await bcrypt.genSalt(10); // 10 rounds de 'hashage' de mot de passe
    let hash = await bcrypt.hash(usersPassword, salt);
    console.log(hash);

    // On compare si notre chaîne de caractère genéré est = au mot de passe
    // Via la "compare"
    let compare = await bcrypt.compare(usersPassword,hash);
    console.log(compare);

    const values = [usersPseudo,usersPassword];
    const result = await client.query(queryString, values);
    // Si la comparaison est bonne, cela renverra true, sinon => false
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
    const queryString = `SELECT * FROM "users" WHERE "email" = '${usersPseudo}' AND "password" = '${usersPassword}' `;
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
    const queryString = "SELECT EXISTS( SELECT * FROM users WHERE \"email\" = $1)";
    const values = [ usersPseudo ];

    const result = await client.query(queryString, values);
    console.log("BLABLABLA", result.rows[0]);

    if(result.rows === true) {
      return;
    }
  },

  getPokemonBySearch: async (searchPokemon) => {
    const queryString = "SELECT * FROM pokemon WHERE  \"name\" ILIKE '%'|| $1 || '%'";
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
    const queryString = `SELECT * FROM pokemon WHERE '${searchType}' ilike ANY(type)`;

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
