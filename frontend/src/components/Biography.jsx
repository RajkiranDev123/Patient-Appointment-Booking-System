import React from "react";

const Biography = () => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img style={{height:200,borderRadius:60}} src="/whoarewe.png" alt="whoweare" />
        </div>
        <div className="banner">

          <h3 style={{color:"grey"}}>Who We Are</h3>
          <p>
          Raj Medical Institute stands at the forefront of modern healthcare. Blending innovation with compassion,
           we deliver world-class medical services tailored to each
           patient. Our mission is to redefine healthcare by making it accessible, reliable, and centered around your well-being.
          </p>
    
        </div>
      </div>
    </>
  );
};

export default Biography;