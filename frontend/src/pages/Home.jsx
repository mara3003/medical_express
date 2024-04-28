import React from "react";
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Departments from "../components/Departments"
import MessageForm from "../components/MessageForm"
import image from "../images/home2.webp"
import image1 from "../images/aboutus.jpg"

const Home = () => {
    return (
        <>

        <Hero title={"Welcome to Medical Express Institute"} imageUrl={image}/>
        <Biography imageUrl={image1}/>
        <Departments/>
        <MessageForm/>
        </>
    )
}

export default Home;