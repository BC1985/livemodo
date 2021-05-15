import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SideDrawer from "../SideDrawer/SideDrawer";

export const showRoutes = routes => {
  return routes.map(r => (
    <li key={r.name}>
      <NavLink to={r.to} onClick={r.onClick}>
        {r.name}
      </NavLink>
    </li>
  ));
};
const Navbar = ({ routes, authenticateRoutes, isLoggedIn }) => {
  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1,
    },
    links: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      }
    }
  }));
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <SideDrawer
          isLoggedIn={isLoggedIn}
          routes={routes}
          authenticateRoutes={authenticateRoutes}
        />
        <Typography variant="h6" className={classes.title}>
          Livemodo
        </Typography>
        <div className="spacer" />
        <div className={`nav-links ${classes.links}`}>
          <ul>{showRoutes(isLoggedIn ? authenticateRoutes : routes)}</ul>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
