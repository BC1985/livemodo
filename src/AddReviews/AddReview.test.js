import React from "react";
import ReactDOM from "react-dom";
import AddReviewsPage from "../AddReviews/AddReviewsPage";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <AddReviewsPage />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
