import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
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
require("dotenv").config();

function App(){
  const [isLoggedIn , setIsloggedIn] = useState(TokenService.hasAuthToken())
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)

  const changeLoginState = () => {
    setIsloggedIn(state=>!state)
  };

  const [selectedDate, handleDateChange] = useState(new Date());
 
  const handleLogOut = () => {
    TokenService.clearAuthToken();
    drawerToggleClickHandler();
    // this.setState({
    //   isLoggedIn: false
    // });
    setIsloggedIn(false)
  };
  const backdropClickHandler = () => {
    setIsSideDrawerOpen(false)
    // this.setState({
    //   isSideDrawerOpen: false
    // });
  };
  const drawerToggleClickHandler = () => {
    setIsSideDrawerOpen(state =>!state)
  };
  const loginProps = {
    isLoggedIn,
    changeLoginState
  };

    // const {
    //   isLoggedIn,
    //   userName,
    //   isEmptyState,
    //   isNewUser,
    //   isSideDrawerOpen
    // } = this.state;

    const routes = [
      {
        to: "/",
        name: "Home",
        onClick: drawerToggleClickHandler
      },
      {
        to: "/reviews",
        name: "Reviews",
        onClick: drawerToggleClickHandler
      },
      {
        to: "/login",
        name: "Log in",
        onClick: drawerToggleClickHandler
      }
    ];
    const authenticateRoutes = [
      {
        to: "/",
        name: "Home",
        onClick: drawerToggleClickHandler
      },
      {
        to: "/browse",
        name: "Browse Reviews",
        onClick: drawerToggleClickHandler
      },
      {
        to: "/add",
        name: "Add Review",
        onClick: drawerToggleClickHandler
      },
      {
        to: "/",
        name: "Log out",
        onClick: handleLogOut
      }
    ];
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
            exact path="/"
             render={props => <LandingPage {...props} {...loginProps} />}
            />
            <Route path="/thank-you" component={ThankYouPage} />
            <Route component={SignupForm} path="/register" />
            <Route path="/reviews" component={BrowseReviewsPage} />
            <Route path="/login" render={props=> <LoginForm {...props}{...loginProps}/>}/>
            {/* {isEmptyState && ( */}
              <Route
                path="/post"render={AddReviewsPage}
              />

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
export default App