import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.css";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core/";

// import DrawerToggleButton from "../DrawerToggleBottun/DrawerToggleButon";
import { makeStyles } from "@material-ui/core/styles";

const Navbar = ({ routes, isSideDrawerOpen, drawerToggleClickHandler }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    
  }));
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="container">
          <nav className="nav-wrapper" role="navigation">
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <div className="hamburger-icon">
                <DrawerToggleButton
                  isSideDrawerOpen={isSideDrawerOpen}
                  click={drawerToggleClickHandler}
                />
              </div>
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
            Livemodo
          </Typography>
            <div className="spacer" />
            <div className="nav-links">
              <ul>
                {routes.map(route => (
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
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Navbar);
