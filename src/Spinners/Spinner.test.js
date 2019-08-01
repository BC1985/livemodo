import React from "react";
import ReactDOM from "react-dom";
import Spinner from "../Spinners/Spinner";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Spinner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
