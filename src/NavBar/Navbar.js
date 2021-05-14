import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SideDrawer from "../SideDrawer/SideDrawer";

const Navbar = ({ routes, isLoggedIn, authenticateRoutes }) => {
  const useStyles = makeStyles(() => ({
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <SideDrawer routes={isLoggedIn ? authenticateRoutes : routes} />
        <Typography variant="h6" className={classes.title}>
          Livemodo
        </Typography>
        <div className="spacer" />
        <div className="nav-links">
          <ul>
            {routes.map(route => (
              <li key={route.name}>
                <NavLink to={route.to}>
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
