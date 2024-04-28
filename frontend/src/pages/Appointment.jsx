import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import image from "../images/appointment.jpg"

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | Medical Express Institute"}
        imageUrl={image}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;