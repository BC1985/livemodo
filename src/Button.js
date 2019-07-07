import React from "react";

const buttonStyle = {
  width: "100px",
  height: "28px",
  borderRadius: "5px",
  backgroundColor: "#373f51",
  color: "whitesmoke"
};
export default function Button(props) {
  return <button style={buttonStyle}>{props.children}</button>;
}
