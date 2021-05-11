import React from "react";
import "./SideDrawer.css";
import { NavLink } from "react-router-dom";

const sideDrawer = ({show, routes}) => {
  let drawerClasses = "side-drawer";
  if (show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        {routes.map(route => (
          <li key={route.name}>
            <NavLink to={route.to} onClick={route.onClick}>
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default sideDrawer;
