import React, { useState } from "react";
import "./SideDrawer.css";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { List, IconButton, Drawer } from "@material-ui/core/";
import { showRoutes } from "../NavBar/Navbar";

const SideDrawer = ({ routes, authenticateRoutes, isLoggedIn }) => {
  const useStyles = makeStyles(theme => ({
    list: {
      width: 200,
      margin: 20,
    },
    icon: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  }));

  const classes = useStyles();
  const [state, setState] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  const list = () => (
    <div
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>{showRoutes(isLoggedIn ? authenticateRoutes : routes)}</List>
    </div>
  );
  return (
    <nav>
      <ul>
        <IconButton
          onClick={toggleDrawer(true)}
          edge="start"
          size="small"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon className={classes.icon} />
        </IconButton>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </ul>
    </nav>
  );
};

export default SideDrawer;
