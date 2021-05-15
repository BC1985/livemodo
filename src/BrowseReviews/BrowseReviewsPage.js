import React, { useEffect, useState } from "react";
import "./BrowseReviewsPage.css";
import Review from "../Review/Review";
import config from "../config";
import Spinner from "../Spinners/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function BrowseReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetch(`${config.API_BASE_URL}/reviews/all`);
        const reviews = await data.json();
        setReviews(reviews);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchReviews();
  }, [])

  const useStyles = makeStyles(() => ({
    heading: {
      padding: 50,
    },
  }));
  const classes = useStyles();

  const allReviews = reviews.map(review => (
    <Review key={review._id} review={review} />
  ));
  return (
    <>
      {isLoading ? <Spinner /> : null}
      <main role="main">
        <Typography variant="h2" className={classes.heading}>
          Posted Reviews
        </Typography>
        <div className="review">{allReviews}</div>
      </main>
    </>
  );
}
export default BrowseReviewsPage;
