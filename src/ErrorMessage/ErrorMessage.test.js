import React from "react";
import ReactDOM from "react-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorMessage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as exptected", () => {
  const tree = renderer.create(<ErrorMessage />).toJSON();
  expect(tree).toMatchSnapshot();
});
