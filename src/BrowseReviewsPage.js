import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";

function BrowseReviewsPage() {
  const star = <FontAwesomeIcon icon={faStar} />;
  const userThumbnail = <FontAwesomeIcon icon={faPortrait} />;

  return (
    <div className="browse-reviews-container">
      <div className="reviews-section">
        <h2>Browse latest reviews</h2>
        <div className="review-container">
          <h3 className="band-name">Sonic Tooth</h3>
          <p>Venue: The Globe Theatre</p>
          <p>Date:12/3/2003</p>
          {star}
          {star}
          {star}
          {star}
          <h4 className="tagline">
            This is a user tagline lorem ipsum dolor sit amet
          </h4>

          <p className="user-name">
            <span className="user-thumbnail">{userThumbnail}</span> Username{" "}
            <span className="user-status">(avid concertgoer)</span>
          </p>
          <div className="review">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              orci tincidunt, rhoncus ipsum in, tincidunt est. Fusce aliquam
              quam nec vulputate varius. In hac habitasse platea dictumst.
              Vivamus vulputate rhoncus ipsum sollicitudin maximus. Pellentesque
              id risus efficitur, egestas odio sit amet, ege
            </p>
          </div>
        </div>
        <div className="review-container">
          <h3 className="band-name">The Pointy Brothers</h3>
          <p className="venue-name">Venue: Bob's Crab Shack</p>
          <p>Date:05/11/2012</p>

          {star}
          {star}
          <h4 className="tagline">
            This is a user tagline lorem ipsum dolor sit amet
          </h4>
          <p className="user-name">
            <span className="user-thumbnail">{userThumbnail}</span> Username{" "}
            <span className="user-status">(Homebody)</span>
          </p>
          <div className="review">
            <p>
              magnis dis parturient montes, nascetur ridiculus mus. Quisque in
              lorem metus. Aenean dolor massa, varius vitae rutrum sed, congue
              at urna. Proin et ex at velit feugiat finibus at eget nunc.
              Suspendisse maximus, lacus eget euismod vulputate, lacus mi
              pharetra ante, sed porta lacus leo ac orci
            </p>
          </div>
        </div>
        <div className="review-container">
          <h3 className="band-name">Veruca's Midnight Spacemen</h3>
          <p className="venue-name">Venue: Pompeii ruins</p>
          <p>Date:04/20/2004</p>

          {star}
          {star}
          {star}
          {star}
          {star}
          <h4 className="tagline">
            This is a user tagline lorem ipsum dolor sit amet
          </h4>
          <p className="user-name">
            <span className="user-thumbnail">{userThumbnail}</span> Username{" "}
            <span className="user-status">(avid concertgoer)</span>
          </p>
          <div className="review">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              orci tincidunt, rhoncus ipsum in, tincidunt est. Fusce aliquam
              quam nec vulputate varius. In hac habitasse platea dictumst.
              Vivamus vulputate rhoncus ipsum sollicitudin maximus. Pellentesque
              id risus efficitur, egestas odio sit amet, ege
            </p>
          </div>
        </div>
      </div>
      <div className="push" />
    </div>
  );
}

export default BrowseReviewsPage;
