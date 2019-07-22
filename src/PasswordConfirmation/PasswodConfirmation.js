import React from "react";
import { Link } from "react-router-dom";

const buffer = {
  height: "400px"
};
const container = {
  height: "-400px",
  marginLeft: "150px",
  marginRight: "150px",
  textAlign: "left"
};
export default function PasswordConfirmation() {
  return (
    <>
      <div style={container}>
        <h2>
          Thank you. A link to change your password has been sent to your email
          address. <Link to="/">Click here to go back to the homepage</Link>
        </h2>
      </div>
      <div style={buffer} />
    </>
  );
}
