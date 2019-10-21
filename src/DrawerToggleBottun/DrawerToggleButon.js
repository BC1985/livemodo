import React, { Component } from "react";
import "./DrawerToggleButton.css";

class drawerToggleButton extends Component {
  render() {
    const { click, isSideDrawerOpen } = this.props;
    const styles = {
      line: {
        height: "3px",
        width: "20px",
        background: "white",
        transition: "all 0.3s ease",
        zIndex: 10
      },
      lineTop: {
        transform: isSideDrawerOpen ? "rotate(50deg)" : "none",
        transformOrigin: "top left",
        marginBottom: "5px"
      },
      lineMiddle: {
        opacity: isSideDrawerOpen ? 0 : 1,
        transform: isSideDrawerOpen ? "translateX(-16px)" : "none"
      },
      lineBottom: {
        transform: isSideDrawerOpen
          ? "translateX(-1px) rotate(-50deg)"
          : "none",
        transformOrigin: "top left",
        marginTop: "5px"
      }
    };
    return (
      <button id="toggle-button" onClick={click}>
        <div style={{ ...styles.line, ...styles.lineTop }} />
        <div style={{ ...styles.line, ...styles.lineMiddle }} />
        <div style={{ ...styles.line, ...styles.lineBottom }} />
      </button>
    );
  }
}

export default drawerToggleButton;
