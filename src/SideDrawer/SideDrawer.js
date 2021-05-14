import React, { useState } from "react";
import "./SideDrawer.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { List, ListItem, IconButton, Drawer } from "@material-ui/core/";

const SideDrawer = ({ routes }) => {
  const useStyles = makeStyles({
    list: {
      width: 200,
    },
  });

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
      <List>
        {routes.map(route => (
          <ListItem button key={route.name}>
            <NavLink to={route.to} onClick={route.onClick}>
              {route.name}
            </NavLink>
          </ListItem>
        ))}
      </List>
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
          <MenuIcon />
        </IconButton>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </ul>
    </nav>
  );
};

export default SideDrawer;
