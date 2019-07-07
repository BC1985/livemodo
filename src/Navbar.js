import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import LoginComponent from "./LoginComponent";

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="nav-wrapper">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add">Add review</NavLink>
          <NavLink to="/browse">Browse reviews</NavLink>
          <NavLink to="/login">
            <LoginComponent>
              {this.props.isLoggedIn ? "" : "Log out"}
            </LoginComponent>
          </NavLink>
        </nav>
      </div>
    );
  }
}
