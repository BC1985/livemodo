export function validateAddReview(venue, band_name, show_date, rating) {
  return {
    band_name: band_name.length === 0,
    venue: venue.length === 0,
    show_date: show_date.length === 0,
    rating: rating.length === 0
  };
}

export function validateRegisration(
  first_name,
  last_name,
  username,
  password,
  email
) {
  return {
    first_name: first_name.length === 0,
    last_name: last_name.length === 0,
    username: username.length === 0,
    password: password.length === 0,
    email: email.length === 0
  };
}
export const shouldBeError = (field, errors, touched) => {
  const hasErrors = errors[field];
  const shouldShow = touched[field];
  return hasErrors ? shouldShow : false;
};
