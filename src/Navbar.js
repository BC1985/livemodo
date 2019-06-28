import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="logo">
          Navbar
        </Link>
      </div>
    </nav>
  );
}
