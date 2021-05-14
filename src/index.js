import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary:{
          main:"#482880"
      },secondary:{
          main:"#4a148c"
      }
    },
  });
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
