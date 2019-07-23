import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import { TokenService } from "../utils/token-service";
import DrawerToggleButton from "../DrawerToggleBottun/DrawerToggleButon";
import BrowseForm from "../BrowseForm/BrowseForm";

class Navbar extends Component {
  render() {
    // const loginOrOut=TokenService.hasAuthToken? 'Log in':'Log out'
    return (
      <div className="container">
        <nav className="nav-wrapper">
          <div className="hamburger-icon">
            <DrawerToggleButton click={this.props.drawerToggleClickHandler} />
          </div>
          <BrowseForm />
          <div className="spacer" />
          <div className="nav-links">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/browse">Browse reviews</NavLink>
              </li>
              <li>
                {TokenService.hasAuthToken() ? (
                  <NavLink to="/login">Log in</NavLink>
                ) : (
                  this.props.renderLoggedInLinks()
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
