import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "./BrowseReviewsPage.css";
import { parseDate } from "./utils/parseDate";

class Review extends Component {
  render() {
    const star = <FontAwesomeIcon icon={faStar} />;
    const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;
    const review = this.props;
    return (
      <>
        <h2 className="band-name">{review.band_name}</h2>
        <p>Venue: {review.venue}</p>
        <p>Date:{parseDate(review.show_date)}</p>
        {star}
        <h4 className="tagline">{review.tagline}</h4>
        <p>posted: {parseDate(review.posted)}</p>
        <p className="user-name">
          <span className="user-thumbnail">{userThumbnail}</span> Username:
          {review.username}{" "}
        </p>
        <div className="review">{review.content}</div>
      </>
    );
  }
}

export default Review;
