import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container">
      <nav className="nav-wrapper">
        <ul>
          <Link to="/">
            <li>About</li>
          </Link>
          <Link to="/add">
            <li>Add review</li>
          </Link>
          <Link to="/browse">
            <li>Browse reviews</li>
          </Link>
          <Link to="/login">
            <li>Log in</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
