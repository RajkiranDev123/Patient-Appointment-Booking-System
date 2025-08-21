import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/pedia.png",
    },
    {
      name: "Orthopedics",
      imageUrl: "/ortho.png",
    },
    {
      name: "Cardiology",
      imageUrl: "/cardio.png",
    },
    {
      name: "Neurology",
      imageUrl: "/neuro.png",
    },
    {
      name: "Oncology",
      imageUrl: "/onco.png",
    },
    {
      name: "Radiology",
      imageUrl: "/radio.png",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/therapy.png",
    },
    {
      name: "Dermatology",
      imageUrl: "/derma.png",
    },
    {
      name: "ENT",
      imageUrl: "/ent.png",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img
                  style={{
                    //  boxShadow:"rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset"
                    borderRadius:150
                     }}
                  src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;