import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Rating(props) {
  const starRating = <FontAwesomeIcon icon={faStar} />;
  const stars = [0, 0, 0, 0, 0].map((_, i) =>
    i < props.value ? (
      <span key={i}>{starRating}</span>
    ) : (
      <span key={i}>{starRating}</span>
    )
  );
  return <div className="rating">{stars}</div>;
}
