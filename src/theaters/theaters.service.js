const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// reduceMovies is a reducer used to nest data
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies_theaters", null, "is_showing"],
  theater_id: ["movies_theaters", null, "theater_id"],
});

// This function joins the theaters, movies, and movie_theaters table.  all the data from the theaters and movies table is selected, and then the reduceMovies function is invoked.
const moviesShowingAtTheater = () => {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", "m.*")
    .then(reduceMovies);
};

module.exports = {
  moviesShowingAtTheater,
};
