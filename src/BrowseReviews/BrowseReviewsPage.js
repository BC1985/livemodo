import React, { Component } from "react";
import "./BrowseReviewsPage.css";
import Review from "../Review/Review";
import config from "../config";
import Spinner from "../Spinners/Spinner";

class BrowseReviewsPage extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchReviews();
  }
  fetchReviews = async () => {
    try {
      const data = await fetch(`${config.API_ENDPOINT}/reviews`);
      const reviews = await data.json();
      this.setState({
        reviews,
        isLoading: false
      });
    } catch (e) {
      console.log(e);
    }
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
        rating={review.rating}
      />
    ));
    return (
      <div className="reviews-container">
        {this.state.isLoading ? <Spinner /> : null}
        <div className="review">{reviewComponents}</div>
      </div>
    );
  }
}
export default BrowseReviewsPage;
