import React, { Component } from "react";
import "./BrowseForm.css";
import config from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

class BrowseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();
    const url = `https://www.googleapis.com/youtube/v3/videos?id=w_7_lEOaU10&key=${
      config.API_KEY
    }&part=snippet`;
    fetch(url)
      .then(res => {
        res.json();
      })
      .then(res => console.log(res));
  };
  render() {
    const searchButtonStyle = {
      width: "40px",
      backgroundColor: "black",
      height: "28px",
      margin: "0px",
      alignSelf: "center",
      borderRadius: "6px"
    };
    const search = <FontAwesomeIcon icon={faSearch} />;
    return (
      <div className="search-form">
        <form id="search-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search performer or venue" />
          <button style={searchButtonStyle}>{search}</button>
        </form>
      </div>
    );
  }
}

export default BrowseForm;
