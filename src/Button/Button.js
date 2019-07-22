import React from "react";
import "./Button.css";

export default function Button(props) {
  return <button id="button">{props.children}</button>;
}
