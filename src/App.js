import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import Navbar from "./NavBar/Navbar";
import Footer from "./Footer/Footer";
import LandingPage from "./LandingPage/LandingPage";
import SignupForm from "./SignupForm/SignupForm";
import BrowseReviewsPage from "./BrowseReviews/BrowseReviewsPage";
import LoginForm from "./LoginPage/LoginPage";
import AddReviewsPage from "./AddReviews/AddReviewsPage";
import ThankYouPage from "./ThankYouPage/ThankYouPage";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import PasswordConfirmation from "./PasswordConfirmation/PasswodConfirmation";
import SideDrawer from "./SideDrawer/SideDrawer";
import { TokenService } from "./utils/token-service";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
require("dotenv").config();

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(TokenService.hasAuthToken());
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const changeLoginState = () => {
    setIsloggedIn(state => !state);
  };

  const handleLogOut = () => {
    TokenService.clearAuthToken();
    drawerToggleClickHandler();
    setIsloggedIn(false);
  };
  const drawerToggleClickHandler = () => {
    setIsSideDrawerOpen(state => !state);
  };
  const loginProps = {
    isLoggedIn,
    changeLoginState
  };
  const routes = [
    {
      to: "/",
      name: "Home",
      onClick: drawerToggleClickHandler,
    },
    {
      to: "/reviews",
      name: "Reviews",
      onClick: drawerToggleClickHandler,
    },
    {
      to: "/login",
      name: "Log in",
      onClick: drawerToggleClickHandler,
    },
  ];
  const authenticateRoutes = [
    {
      to: "/",
      name: "Home",
      onClick: drawerToggleClickHandler,
    },
    {
      to: "/reviews",
      name: "Browse Reviews",
      onClick: drawerToggleClickHandler,
    },
    {
      to: "/post",
      name: "Add Review",
      onClick: drawerToggleClickHandler,
    },
    {
      to: "/",
      name: "Log out",
      onClick: handleLogOut,
    },
  ];
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="App">
          <SideDrawer
            show={isSideDrawerOpen}
            drawerToggleClickHandler={drawerToggleClickHandler}
            routes={isLoggedIn ? authenticateRoutes : routes}
          />
          <Navbar
            isLoggedIn={isLoggedIn}
            routes={isLoggedIn ? authenticateRoutes : routes}
            changeLoginState={changeLoginState}
            drawerToggleClickHandler={drawerToggleClickHandler}
            click={drawerToggleClickHandler}
            isSideDrawerOpen={isSideDrawerOpen}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <LandingPage {...props} {...loginProps} />}
            />
            <Route path="/thank-you" component={ThankYouPage} />
            <Route
              path="/register"
              render={props => <SignupForm {...props} {...loginProps} />}
            />
            <Route path="/reviews" component={BrowseReviewsPage} />
            <Route
              path="/login"
              render={props => <LoginForm {...props} {...loginProps} />}
            />
            <Route path="/post" render={props=><AddReviewsPage {...props} {...loginProps} />}  />

            <Route path="/forgot-password" component={ForgotPassword} />
            <Redirect from="/forgot-password" to="/confirmation" />
            <Route path="/confirmation" component={PasswordConfirmation} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}
export default App;
