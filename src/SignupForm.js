import React from "react";

function SignupForm() {
  return (
    <>
      <div className="call-to-action">
        <h3>Join the Livemodo community!</h3>
      </div>
      <div className="signup-form">
        <form>
          <label>*First Name</label>
          <input type="text" placeholder="e.g Tommy" required />
          <label>*Last Name</label>
          <input type="text" placeholder="e.g Wisseau" required />
          <label>*Username</label>
          <input type="text" required />
          <label>*Email</label>
          <input type="text" placeholder="e.g tommy@theroom.com" required />
          <label>*Password</label>
          <input type="text" required />
          <p>Pick the option that best describes your concergoing habits</p>
          <input type="radio" />
          Homebody
          <input type="radio" />
          Occasional concertgoer
          <input type="radio" />
          Concert Connuiseur
          <p>(* indicated required field)</p>
          <button type="submit">Sign me up!</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
