const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// This function initializes listOfTheaters with the data returned from the theatersService.moviesShowingAtTheater()
// The returned value is passed into the res.json
const listTheaters = async (req, res, next) => {
  const listOfTheaters = await theatersService.moviesShowingAtTheater();

  res.json({ data: listOfTheaters });
};

module.exports = {
  listTheaters: asyncErrorBoundary(listTheaters),
};
