import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "../BrowseReviews/BrowseReviewsPage.css";
import { postedAt, showDate } from "../utils/parseDate";
import Rating from "../Rating/Rating";

function Review({ username, content, tagline,venue, rating,posted, band_name,show_date }) {
  const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;
  return (
    <>
      <div className="review">
        <p className="user-name">
          <span className="user-thumbnail">{userThumbnail}</span>{" "}
          <span className="username"> {username}</span>
        </p>
        <p>posted: { postedAt(posted) }</p>
        <h2 className="band-name">{band_name}</h2>
        <h3 className="tagline">{tagline}</h3>
        <p>Venue: {venue}</p>
        <p>Date: { showDate(show_date) }</p>
        <Rating value={rating} />
        <div className="review-content">{content}</div>
      </div>
    </>
  );
}

export default Review;
