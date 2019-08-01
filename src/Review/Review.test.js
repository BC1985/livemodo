import React from "react";
import ReactDOM from "react-dom";
import Review from "../Review/Review";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Review />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the UI as expected", () => {
  const tree = renderer.create(<Review />).toJSON();
  expect(tree).toMatchSnapshot();
});
