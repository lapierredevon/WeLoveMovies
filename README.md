# Capstone: We Love Movies

## Summary

For this project I set up a database, using Express.js and Knex.js. I created tables using Knex migration files and used Knex to write functions to query data from the database.

## Usage

This RESTFUL api can be used to build projects.

## Built With

- cors
- dotenv
- express
- knex
- lodash
- morgan
- pg
- sqlite3

## RESTFULapi Link

- https://we-love-movies-y1dy.onrender.com

## Routes

### /movies

- `GET /movies` returns all movies currently in the database
- `GET /movies?is_showing=true` returns all movies that are currently showing in a theater
- `GET /movies/:movieId` returns movie in the database where the id matches the params
- `GET /movies/:movieId/theaters` return all the theaters where the movie is playing
- `GET /movies/:movieId/reviews` return all the reviews for the movie

### /reviews

- `DELETE /reviews/:reviewId` route will delete a review by ID
- `PUT /reviews/:reviewId` updates the review with the matching id

### /theaters

- `GET /theaters` return all the `theaters` and, the movies playing at each theatre
