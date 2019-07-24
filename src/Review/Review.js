import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "../BrowseReviews/BrowseReviewsPage.css";
import { parseDate } from "../utils/parseDate";

class Review extends Component {
  render() {
    const star = <FontAwesomeIcon icon={faStar} />;
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
          <h4 className="tagline">{review.tagline}</h4>
          <p>Venue: {review.venue}</p>
          <p>Date: {parseDate(review.show_date)}</p>
          {star}
          {star}
          <div className="review-content">{review.content}</div>
        </div>
      </>
    );
  }
}

export default Review;
