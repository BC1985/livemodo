import React from "react";
import ReactDOM from "react-dom";
import SideDrawer from "../SideDrawer/SideDrawer";
import { MemoryRouter, NavLink } from "react-router-dom";
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
