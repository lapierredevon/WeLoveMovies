// This function creates the critics table and assigns columns to the table.
exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary();
    table.string(`preferred_name`);
    table.string("surname");
    table.string(`organization_name`);
    table.timestamps(true, true);
  });
};

// This function drops the critics table
exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
