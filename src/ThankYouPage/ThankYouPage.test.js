import React from "react";
import ReactDOM from "react-dom";
import ThankYouPage from "../ThankYouPage/ThankYouPage";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <ThankYouPage />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
