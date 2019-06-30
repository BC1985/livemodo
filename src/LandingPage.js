import React from "react";

const CallToAction = () => {
  return (
    <div>
      <h3>Sign up</h3>
    </div>
  );
};

const Description = () => {
  return (
    <div>
      Have you ever bought a ticket to see your favorite band play live in your
      hometown only to have your experience ruined by the lead singer's lack of
      stage presence? Or maybe you're kicking yourself for missing out on
      catching that unknown band play at the block party right before they made
      it big and now the concert tickets are too expensive... If so, then
      Livemodo is the right tool for any music lover. Houndreds of reviews from
      fellow concertgoers will help you manage your expectations in your
      upcoming concert escapades.
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Livemodo</h1>
        <h3>Your wiki live shows resource</h3>
      </div>
      <div className="call-to-action">
        <CallToAction />
      </div>
      <div className="description">
        <Description />
      </div>
    </div>
  );
}
