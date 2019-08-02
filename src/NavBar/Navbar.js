import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import DrawerToggleButton from "../DrawerToggleBottun/DrawerToggleButon";
class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <nav className="nav-wrapper" role="navigation">
          <div className="hamburger-icon">
            <DrawerToggleButton click={this.props.drawerToggleClickHandler} />
          </div>
          <div id="logo">LIVEMODO</div>
          <div className="spacer" />
          <div className="nav-links">
            <ul>
              {this.props.routes.map(route => (
                <li key={route.name}>
                  <NavLink to={route.to} onClick={route.onClick}>
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
