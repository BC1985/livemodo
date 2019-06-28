import React from "react";

function SignupForm() {
  const spanStyle = {
    color: "gray",
    fontStyle: "italic",
    fontSize: "12px"
  };
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
          <p style={spanStyle}>(* indicates required field)</p>
          <p>
            Pick the option that best describes your concergoing habits{" "}
            <span style={spanStyle}>(optional)</span>
          </p>
          <div>
            <input type="radio" value="homebody" />
            Homebody
          </div>
          <div>
            <input type="radio" />
            Occasional concertgoer
          </div>
          <div>
            <input type="radio" />
            Concert Connuiseur
          </div>
          <button type="submit">Sign me up!</button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
