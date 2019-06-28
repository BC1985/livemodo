import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import "./Navbar.css";
import Footer from "./Footer";
import "./Footer.css";
import LandingPage from "./LandingPage";
import "./LandingPage.css";
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <LandingPage />
          <Footer />
        </div>
      </Router>
    );
  }
}
