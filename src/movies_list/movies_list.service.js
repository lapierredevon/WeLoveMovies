const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// This function selects all of the columns in the movies table. it is exported for use in the controller movie_list file.
function list() {
  return knex("movies").select("*");
}

// This function joins the movie_theaters and movies table. it returns a list of movies that has the is_showing column in the movie_theaters table set to true.
function moviesIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "mt.is_showing")
    .where("mt.is_showing", true)
    .distinct("mt.is_showing");
}

// This function accepts a parameter then it query the movies table and returns all the columns where the movie_id is equal to the parameter.
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first(); //returns first row in the table
}

//This function joins the movie_theaters and theaters table. it returns a list of theaters that has the is_showing set to true and whose movie_id is equal to the parameter
function displayTheatersShowingFilms(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movieId, "mt.is_showing": true });
}

//add critics to review
const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

//This function joins the reviews and critics table. it returns a list of reviews and critics that have the movie_id equal to the parameter.The addCritics function is used to nest the data from the critics table
function reviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ movie_id: movieId })
    .then((data) => data.map(addCritic));
}

module.exports = {
  list,
  moviesIsShowing,
  read,
  displayTheatersShowingFilms,
  reviews,
};
