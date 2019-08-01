import React from "react";
import ReactDOM from "react-dom";
import DrawerToggleBottun from "../DrawerToggleBottun/DrawerToggleButon";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DrawerToggleBottun />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer.create(<DrawerToggleBottun />).toJSON();
  expect(tree).toMatchSnapshot();
});
