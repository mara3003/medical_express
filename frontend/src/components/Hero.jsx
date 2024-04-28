import React from "react";

const Hero = ({title, imageUrl}) =>{
    return <>
    <div className="hero container">
        <div className="banner">
            <h1>
                {title}
            </h1>
            <p>
            We make scheduling simple and convenient for you. 
            Through our online booking platform, 
            you can easily schedule appointments 
            and treatments based on your availability.
            </p>
        </div>
        <div className="banner">
            <img src={imageUrl} alt="hero" className="animated-image" />
            <span>
                <img src="/Vector.png" alt="vector" />
            </span>
        </div>
    </div>
    </>
}

export default Hero;