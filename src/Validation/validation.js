export function validateAddReview(venue, band_name, show_date, rating) {
  return {
    band_name: band_name.length === 0,
    venue: venue.length === 0,
    show_date: show_date.length === 0,
    rating: rating.length === 0
  };
}
export const shouldBeError = (field, errors, touched) => {
  const hasErrors = errors[field];
  const shouldShow = touched[field];
  return hasErrors ? shouldShow : false;
};
