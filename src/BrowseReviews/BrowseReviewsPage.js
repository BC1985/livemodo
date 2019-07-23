import React, { Component } from "react";
import "./BrowseReviewsPage.css";
import Review from "../Review/Review";
import config from "../config";

class BrowseReviewsPage extends Component {
  constructor() {
    super();
    this.state = {
      reviews: []
    };
  }
  componentDidMount() {
    this.fetchReviews();
  }
  fetchReviews = async () => {
    const data = await fetch(`${config.API_BASE_URL}/reviews`);
    const reviews = await data.json();
    this.setState({
      reviews
    });
  };
  render() {
    const { reviews } = this.state;
    const reviewComponents = reviews.map(review => (
      <Review
        key={review.id}
        band_name={review.band_name}
        show_date={review.show_date}
        tagline={review.tagline}
        posted={review.posted}
        venue={review.venue}
        content={review.content}
        username={review.username}
      />
    ));
    return (
      <div className="reviews-container">
        <div>{reviewComponents}</div>
      </div>
    );
  }
}
export default BrowseReviewsPage;