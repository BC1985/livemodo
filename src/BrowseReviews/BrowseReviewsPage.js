import React, { useEffect, useState } from "react";
import "./BrowseReviewsPage.css";
import Review from "../Review/Review";
import config from "../config";
import Spinner from "../Spinners/Spinner";

function BrowseReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() =>{
    const fetchReviews = async () => {
      try {
        const data = await fetch(`${config.API_BASE_URL}/reviews/all`);
        const reviews = await data.json();
        setReviews(reviews);   
        console.log(reviews)
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchReviews();
  },[])
    
    const allReviews = reviews.map(review => (
      <Review
        key={review._id}
        bandName={review.bandName}
        showDate={review.showDate}
        tagline={review.tagline}
        posted={review.createdAt}
        venue={review.venue}
        content={review.content}
        username={review.username}
        rating={review.rating}
      />
    ));
    return (
      <div className="reviews-container">
        {isLoading ? <Spinner /> : null}
        <main role="main">
          <h1>Posted reviews</h1>
          <div className="review">{allReviews}</div>
        </main>
      </div>
    );
  
}
export default BrowseReviewsPage;
