import React from "react";

export default function addReviewsPage() {
  const spanStyle = {
    color: "gray",
    fontStyle: "italic",
    fontSize: "12px"
  };
  return (
    <div>
      <div className="add-review-container">
        <div>
          <h2 id="call-to-action">Add review</h2>
        </div>
        <form>
          <label>
            Add tagline <span style={spanStyle}>(optional)</span>
          </label>
          <textarea placeholder="Write a short sentence describing your experiece of the show" />
          <label>*Name of performer/ band</label>
          <input placeholder="e.g The hungry caterpillars" required />
          <label>*Name of venue</label>
          <input placeholder="e.g Yolanda's prophylactic emporium" required />
          <label>*Date of performace</label>
          <input type="text" required />
          <p style={spanStyle}>(* indicates required field)</p>
          <label>*Rate your experience</label>
          <div className="radio-buttons">
            <input type="radio" />1
            <input type="radio" />2
            <input type="radio" />3
            <input type="radio" />4
            <input type="radio" />5
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
