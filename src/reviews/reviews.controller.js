const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// This validation middleware initializes review with the data that is returned using the reviewsService.read function.
// if the review value exists its value is set to res.locals then it moves unto the next function
// else it returns the error handler with the status code and message that has been passed into it.
const reviewExists = async (req, res, next) => {
  const review = await reviewsService.read(req.params.reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
};

const VALID_PROPERTIES = [
  "review_id",
  "content",
  "score",
  "created_at",
  "updated_at",
  "critic_id",
  "movie_id",
  "critic",
];

// This validation middleware checks to see that data that is updated has all of the required fields.
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// This function recalls the reviewsService delete function and deletes the row in the database that matches the arguments id.
async function destroy(req, res, next) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  return res.sendStatus(204);
}

// This function updates the existing data in the database.
async function update(req, res, next) {
  const { reviewId } = req.params;
  const reviewData = req.body.data;
  const updatedReview = {
    ...reviewData,
    review_id: reviewId,
  };
  return res.json({ data: await reviewsService.update(updatedReview) });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), destroy],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(update),
  ],
};
