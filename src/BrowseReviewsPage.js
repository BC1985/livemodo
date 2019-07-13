import React, { Component } from "react";
// import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "./BrowseReviewsPage.css";
// import { parseDate } from "./utils/parseDate";
import Review from "./Review";

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
    const data = await fetch("http://localhost:8000/api/reviews");
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
