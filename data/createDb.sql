CREATE TABLE "pokemon"(
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50),
  "pv" INT,
  "attaque" INT,
  "defense" INT,
  "attaque_spe" INT,
  "defense_spe" INT,
  "vitesse" INT,
  "type" varchar []
);
