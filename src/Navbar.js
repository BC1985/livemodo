import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

// import LoginComponent from "./LoginComponent";

export default class Navbar extends Component {
  render() {
    let { isLoggedIn } = this.props;
    return (
      <div className="container">
        <nav className="nav-wrapper">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add">Add review</NavLink>
          <NavLink to="/browse">Browse reviews</NavLink>
          {isLoggedIn ? <NavLink to="/"> Log out </NavLink> : null}
        </nav>
      </div>
    );
  }
}
