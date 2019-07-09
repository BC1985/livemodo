import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "./BrowseReviewsPage.css";
import { parseDate } from "./utils/parseDate";

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
    console.log(this.state);
  };
  render() {
    const star = <FontAwesomeIcon icon={faStar} />;
    // const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;
    const { reviews } = this.state;
    return (
      <>
        <div>
          {reviews.map(review => (
            <div key={review.id}>
              <h2>{review.band_name}</h2>
              <h3>{review.tagline}</h3>
              <p>Venue: {review.venue}</p>
              <p>Date: {parseDate(review.show_date)}</p>
              <p>posted: {parseDate(review.posted)}</p>
              <p>{review.content}</p>
              <p>{star}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default BrowseReviewsPage;
