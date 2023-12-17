export const calculateAverageRating = reviews => {
  if (!reviews || reviews.length === 0) {
    return 0; // Return 0 if there are no reviews or the array is empty.
  }

  const totalRating = reviews.reduce(
    (accumulator, review) => accumulator + review.rating,
    0,
  );
  const averageRating = totalRating / reviews.length;

  return averageRating;
};
