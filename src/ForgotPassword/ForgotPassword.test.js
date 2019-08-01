import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as exptected", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
