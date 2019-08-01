import React from "react";
import ReactDOM from "react-dom";
import SignupForm from "../SignupForm/SignupForm";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
