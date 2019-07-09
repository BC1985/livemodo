import React, { Component } from "react";
import Button from "./Button";
import "./BrowseForm.css";
import { API_KEY } from "./config";
class BrowseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();
    const url = `https://www.googleapis.com/youtube/v3/videos?id=w_7_lEOaU10&key=${API_KEY}&part=snippet`;
    fetch(url)
      .then(res => {
        res.json();
      })
      .then(res => console.log(res));
  };
  render() {
    return (
      <div className="search-form">
        <form id="search-form" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search performer or venue" />
          <Button>search</Button>
        </form>
      </div>
    );
  }
}

export default BrowseForm;
