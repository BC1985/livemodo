import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
