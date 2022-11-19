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
  }
};

module.exports = dataMapper;
