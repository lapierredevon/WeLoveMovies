const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const newCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

// This function joins the reviews table and the critics table. It selects all the rows where review_id matches the arguments passed into the function. NewCritic is then applied to the value that is returned to nest some of the data that is returned.
const read = (review_id) => {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": review_id })
    .first()
    .then(newCritic);
};

// This function deletes the row that has an id matching the argument that was passed into the function.
const destroy = (review_id) => {
  return knex("reviews").where({ review_id: review_id }).del();
};

// This function selects all the rows in the reviews table that has a matching id to the arguments id that was passed into the function and updates the rows with the argument that was passed into the function. Then the read function is used to display the updated data.
const update = (updatedReview) => {
  return knex("reviews as r")
    .select("r.*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => read(updatedReview.review_id));
};

module.exports = {
  read,
  update,
  delete: destroy,
};
