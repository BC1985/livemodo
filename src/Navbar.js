import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import { TokenService } from "./utils/token-service";

// import LoginComponent from "./LoginComponent";

class Navbar extends Component {
  handleLogOut = () => {
    TokenService.clearAuthToken();
  };

  renderLoggedInLinks = () => {
    return (
      <>
        <NavLink to="/add">Add review</NavLink>
        <NavLink to="/" onClick={this.handleLogOut}>
          Log out
        </NavLink>
      </>
    );
  };
  render() {
    return (
      <div className="container">
        <nav className="nav-wrapper">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/browse">Browse reviews</NavLink>
          {TokenService.hasAuthToken() ? this.renderLoggedInLinks() : null}
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
