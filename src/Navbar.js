import React from "react";
import { Link } from "react-router-dom";
import LoginComponent from "./LoginComponent";

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
            <li>
              <LoginComponent />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
