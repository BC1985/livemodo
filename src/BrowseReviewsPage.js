import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faMusic } from "@fortawesome/free-solid-svg-icons";

function BrowseReviewsPage() {
  const star = <FontAwesomeIcon icon={faStar} />;
  //   const musicalNote = <FontAwesomeIcon icon={faMusic} />;

  return (
    <>
      <div className="band-search">
        <form>
          <label>Search band </label>
          <input type="text" placeholder="e.g The Zombie Kittens" />
          <button type="submit">Go</button>
        </form>
      </div>
      <div className="browse-reviews-container">
        <div className="reviews-section">
          <h2>Browse latest reviews</h2>
          <div className="review-container">
            <h3 className="band-name">Wild Munching Goats</h3>
            {star}
            {star}
            {star}
            {star}
            <h4 className="tagline">
              This is a user tagline lorem ipsum dolor sit amet
            </h4>
            <p className="user-name">
              Username <span className="user-status">(avid concertgoer)</span>
            </p>
            <div className="review">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                a orci tincidunt, rhoncus ipsum in, tincidunt est. Fusce aliquam
                quam nec vulputate varius. In hac habitasse platea dictumst.
                Vivamus vulputate rhoncus ipsum sollicitudin maximus.
                Pellentesque id risus efficitur, egestas odio sit amet, ege
              </p>
            </div>
          </div>
          <div className="review-container">
            <h3 className="band-name">The Pointy Brothers</h3>
            {star}
            {star}
            <h4 className="tagline">
              This is a user tagline lorem ipsum dolor sit amet
            </h4>
            <p className="user-name">
              Username <span className="user-status">(Homebody)</span>
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
            {star}
            {star}
            {star}
            {star}
            {star}
            <h4 className="tagline">
              This is a user tagline lorem ipsum dolor sit amet
            </h4>
            <p className="user-name">
              Username <span className="user-status">(avid concertgoer)</span>
            </p>
            <div className="review">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                a orci tincidunt, rhoncus ipsum in, tincidunt est. Fusce aliquam
                quam nec vulputate varius. In hac habitasse platea dictumst.
                Vivamus vulputate rhoncus ipsum sollicitudin maximus.
                Pellentesque id risus efficitur, egestas odio sit amet, ege
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrowseReviewsPage;
