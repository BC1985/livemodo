import React from "react";
import ReactDOM from "react-dom";
import BrowseReviewsPage from "../BrowseReviews/BrowseReviewsPage";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowseReviewsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer.create(<BrowseReviewsPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
