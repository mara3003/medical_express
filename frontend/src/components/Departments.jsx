import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import pediaImage from "../images/pedia.jpg";
import orthoImage from "../images/ortho.jpg";
import cardioImage from "../images/cardio.jpg";
import neuroImage from "../images/neuro.jpg";
import oncoImage from "../images/onco.jpg";
import radioImage from "../images/radio.jpg";
import therapyImage from "../images/therapy.jpg";
import dermaImage from "../images/derma.jpg";
import entImage from "../images/ent.jpg";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: pediaImage,
    },
    {
      name: "Orthopedics",
      imageUrl: orthoImage,
    },
    {
      name: "Cardiology",
      imageUrl: cardioImage,
    },
    {
      name: "Neurology",
      imageUrl: neuroImage,
    },
    {
      name: "Oncology",
      imageUrl: oncoImage,
    },
    {
      name: "Radiology",
      imageUrl: radioImage,
    },
    {
      name: "Physical Therapy",
      imageUrl: therapyImage,
    },
    {
      name: "Dermatology",
      imageUrl: dermaImage,
    },
    {
      name: "ENT",
      imageUrl: entImage,
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
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;