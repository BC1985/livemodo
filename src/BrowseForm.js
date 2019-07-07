import React, { Component } from "react";
import Button from "./Button";

class BrowseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="search-form">
        <form>
          <input type="text" placeholder="Search performer or venue " />
          <Button>search</Button>
        </form>
      </div>
    );
  }
}

export default BrowseForm;
