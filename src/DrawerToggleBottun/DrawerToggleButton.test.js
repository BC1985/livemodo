import React from "react";
import ReactDOM from "react-dom";
import DrawerToggleBottun from "../DrawerToggleBottun/DrawerToggleButon";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DrawerToggleBottun />, div);
  ReactDOM.unmountComponentAtNode(div);
});
