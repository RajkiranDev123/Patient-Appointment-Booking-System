import React from "react";

const Hero = ({ }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>Welcome to Raj Medical Institute — Where Compassion Meets Care</h1>
          <p>
            At Raj Medical Institute, we believe healthcare goes beyond treatment—it’s
             about compassion, trust, and care. With advanced facilities and a team of skilled experts, we are dedicated to 
             supporting every patient’s journey to better health. Your well-being is at the heart of everything we do.
          </p>
        </div>
        <div className="banner">
          <img src="/hero.png" alt="hero" className="animated-image" />
        </div>
      </div>
    </>
  );
};

export default Hero;