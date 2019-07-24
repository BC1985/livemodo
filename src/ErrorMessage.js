import React from "react";
const errorStyle = {
  textAlign: "center",
  color: "red"
};
function ErrorMessage() {
  return <div style={errorStyle}>Something went wrong, please try again.</div>;
}

export default ErrorMessage;
