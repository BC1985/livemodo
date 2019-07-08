import React, { Component } from "react";
import Button from "./Button";
import "./BrowseForm.css";

class BrowseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="search-form">
        <form id="search-form">
          <input type="text" placeholder="Search performer or venue " />
          <Button>search</Button>
        </form>
      </div>
    );
  }
}

export default BrowseForm;
