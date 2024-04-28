import React from "react";
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import image from "../images/aboutus.jpg"
import image2 from "../images/home2.webp"

const AboutUs = () =>{
    return (<>
    <Hero title={"Learn More About Us | Medical Express"} imageUrl={image2}/>
    <Biography imageUrl={image}/>
    </>)
}

export default AboutUs;