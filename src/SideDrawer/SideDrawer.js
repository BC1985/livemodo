import React from "react";
import "./SideDrawer.css";
import { NavLink } from "react-router-dom";
import { TokenService } from "../utils/token-service";

const sideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <NavLink to="/" onClick={props.drawerToggleClickHandler}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/browse" onClick={props.drawerToggleClickHandler}>
            Browse reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" onClick={props.drawerToggleClickHandler}>
            Log in
          </NavLink>
        </li>
        {TokenService.hasAuthToken() ? props.renderLoggedInLinks() : null}
      </ul>
    </nav>
  );
};

export default sideDrawer;
