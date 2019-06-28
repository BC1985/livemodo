import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import "./Navbar.css";
import Footer from "./Footer";
import "./Footer.css";
import LandingPage from "./LandingPage";
import "./LandingPage.css";
import SignupForm from "./SignupForm";
import "./SignupForm.css";
import BrowseReviewsPage from "./BrowseReviewsPage";
import "./BrowseReviewsPage.css";
import LoginForm from "./LoginPage";
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <LandingPage />
          <SignupForm />
          <BrowseReviewsPage />
          <LoginForm />
          <Footer />
        </div>
      </Router>
    );
  }
}
