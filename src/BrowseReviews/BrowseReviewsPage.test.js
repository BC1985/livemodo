import React from "react";
import ReactDOM from "react-dom";
import BrowseReviewsPage from "../BrowseReviews/BrowseReviewsPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowseReviewsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
