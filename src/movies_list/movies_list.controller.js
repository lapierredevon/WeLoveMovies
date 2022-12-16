const moviesService = require("./movies_list.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// This function checks to see if there is a req.query.
// if there is a req.query it checks to see if its value is true
// if the query's value is equal to true it returns the data query from  function else it will respond with the data  from the list function.
async function list(req, res, next) {
  const showing = req.query.is_showing;
  if (showing) {
    showing === "true" &&
      res.json({ data: await moviesService.moviesIsShowing() });
  }
  res.json({ data: await moviesService.list() });
}

// Validation middleware that uses the req.param as an argument for the read function that has been imported from the movie_list.service file.  The data returned from the read function is used to initialize the movie variable. If the movie variable exists it is set to res.locals.movie, else it uses next to send the status code and error message to the error handler
async function movieIsValid(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(Number(movieId));

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

// This function uses the movie_id from the data that was stored in res.locals and initializes the movie variable. The variable is used as an argument for the read function that has been imported from the movie_list.service file. The data with the matching id is returned
async function read(req, res) {
  const movie = res.locals.movie.movie_id;
  res.json({ data: await moviesService.read(movie) });
}

// This function uses the movie_id from the data that was stored in res.locals and initializes the movie variable. The variable is used as an argument for the displayTheatersShowingFilms function that has been imported from the movie_list.service file. A list of theaters showing the movie is returned.
async function theatersShowingFilm(req, res) {
  const movie = res.locals.movie.movie_id;
  res.json({ data: await moviesService.displayTheatersShowingFilms(movie) });
}

// This function uses the movie_id for the data stared in res.locals and uses it as an argument in the reviews function. This function returns reviews and critic information stored in the database.
async function reviews(req, res) {
  const movie = res.locals.movie.movie_id;
  res.json({ data: await moviesService.reviews(movie) });
}

module.exports = {
  read: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(read)],
  theatersShowingFilm: [
    asyncErrorBoundary(movieIsValid),
    asyncErrorBoundary(theatersShowingFilm),
  ],
  reviews: [asyncErrorBoundary(movieIsValid), asyncErrorBoundary(reviews)],
  list: [asyncErrorBoundary(list)],
};
