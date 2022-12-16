if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const movieListRouter = require("../src/movies_list/movies_list.routes");
const reviewRouter = require("../src/reviews/reviews.routes");
const theatersRouter = require("../src/theaters/theater.routes");
const cors = require("cors");

// app.use cors enables cross origin resource sharing
app.use(cors());
app.use(express.json());
app.use("/movies", movieListRouter);
app.use("/reviews", reviewRouter);
app.use("/theaters", theatersRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
