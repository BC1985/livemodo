import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import NavBar from "../NavBar/Navbar";
const routes = [
  {
    to: "/",
    name: "Home"
  },
  {
    to: "/browse",
    name: "Browse Reviews"
  },
  {
    to: "/login",
    name: "Log in"
  }
];
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <NavBar routes={routes} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders UI as exptected", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <NavBar routes={routes} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
