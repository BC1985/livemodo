import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "../BrowseReviews/BrowseReviewsPage.css";
import { parseDate } from "../utils/parseDate";
import Rating from "../Rating/Rating";

class Review extends Component {
  render() {
    const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;
    const review = this.props;

    return (
      <>
        <div className="review">
          <p className="user-name">
            <span className="user-thumbnail">{userThumbnail}</span>{" "}
            <span className="username"> {review.username}</span>
          </p>
          <p>posted: {parseDate(review.posted)}</p>
          <h2 className="band-name">{review.band_name}</h2>
          <h3 className="tagline">{review.tagline}</h3>
          <p>Venue: {review.venue}</p>
          <p>Date: {parseDate(review.show_date)}</p>
          <Rating value={review.rating} />
          <div className="review-content">{review.content}</div>
        </div>
      </>
    );
  }
}

export default Review;
