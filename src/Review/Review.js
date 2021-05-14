import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import "../BrowseReviews/BrowseReviewsPage.css";
import { dateAndTime } from "../utils/parseDate";
import Rating from "../Rating/Rating";

function Review({ review }) {
  const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;
  const { content, tagline, venue, rating, createdAt, bandName, showDate } =
    review;
  return (
    <>
      <div className="review">
        <p className="user-name">
          <span className="user-thumbnail">{userThumbnail}</span>{" "}
        </p>
        <p>posted: {dateAndTime(createdAt, "PPPPp")}</p>
        <h2 className="band-name">{bandName}</h2>
        <p>{dateAndTime(showDate, "PPPP")}</p>
        <h3 className="tagline">{tagline}</h3>
        <p>Venue: {venue}</p>
        <Rating value={rating} />
        <div className="review-content">{content}</div>
      </div>
    </>
  );
}

export default Review;
