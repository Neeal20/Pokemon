const pokedex = require("./pokedex.json");

// 1. require le module
const pg = require("pg");
// 2. Créer un client
const client = new pg.Client("postgresql://postgres:cecc1AWIA4DHgjTsG3BG@containers-us-west-159.railway.app:6014/railway");
// 3. Connecter le client
client.connect();

pokedex.forEach(pokemon => client.query(`
  INSERT INTO pokemon (name, pv, attaque, defense, attaque_spe, defense_spe, vitesse, type)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
[pokemon.nom, pokemon.pv, pokemon.attaque, pokemon.defense, pokemon.attaque_spe, pokemon.defense_spe,pokemon.vitesse,pokemon.type])
);
