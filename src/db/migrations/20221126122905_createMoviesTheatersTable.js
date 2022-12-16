// This function creates the movies_theaters table. The movies and theatre table are referenced.
exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table.integer("theater_id").unsigned().notNullable();
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("cascade");
    table.boolean("is_showing");
    table.timestamp(true, true);
  });
};

// This function drops the movie_theatre table.
exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
