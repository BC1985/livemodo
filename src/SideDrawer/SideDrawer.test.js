import React from "react";
import ReactDOM from "react-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
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
      <SideDrawer routes={routes} />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <SideDrawer routes={routes} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
